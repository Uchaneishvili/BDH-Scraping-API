import { Request, Response } from 'express'
import {
  createdResponse,
  handleError,
  successResponse,
} from '../util/apiResponse'
import { generatePaging } from '../util/generatePaging'
import TherapistModel from '../models/therapist'
import { ITherapist } from '../types/therapists'
import request from 'request-promise'
import cheerio from 'cheerio'
import { createObjectCsvWriter } from 'csv-writer'
import { Logger } from '../util/Logger'

export class TherapistController {
  public async getTherapists(req: Request, res: Response): Promise<void> {
    try {
      const [skip, limit] = generatePaging(req)
      const query = {}

      const [therapists, totalCount] = await Promise.all([
        await TherapistModel.find(query)
          .lean()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        await TherapistModel.countDocuments(query),
      ])

      return successResponse({ therapists, totalCount }, res)
    } catch (error) {
      return handleError(error, res, 'Error while searching therapists.')
    }
  }

  private async scrapeData(
    pageNumber: number,
    data: ITherapist[]
  ): Promise<void> {
    try {
      const url = `https://www.bdh-online.de/patienten/therapeutensuche/?seite=${pageNumber}`
      const html = await request(url)
      const $ = cheerio.load(html)

      const therapistRows = $('table.table tbody tr')

      for (const element of therapistRows) {
        let dataRowObj: ITherapist = {}

        const detailsLink = $(element)
          .find('td:nth-child(6) a.btn.btn-default')
          .attr('href')

        if (detailsLink) {
          const fullName = $(element).find('td:nth-child(1)').text().trim()
          const plz = $(element).find('td:nth-child(3)').text().trim()
          const ort = $(element).find('td:nth-child(4)').text().trim()

          const [lastName, firstName] = fullName
            .split(',')
            .map((name) => name.trim())

          const detailsHtml = await request(detailsLink)
          const detailsPage = cheerio.load(detailsHtml)

          dataRowObj = {
            firstName: firstName,
            lastName: lastName,
            zipCode: plz,
            city: ort,
          }

          const emailElement = detailsPage(
            'table tbody tr:contains("E-Mail") a'
          )
          const email = emailElement.length
            ? emailElement.attr('href')?.replace('mailto:', '')
            : ''

          if (email) {
            dataRowObj.email = email.replace('mailto:', '')
          }

          data.push(dataRowObj)
        }
      }

      if (pageNumber < 2) {
        await this.scrapeData(pageNumber + 1, data)
      } else {
        Logger.info('Inserted Data Successfully')
      }
    } catch (err) {
      Logger.error('Error during scraping:', err)
    }
  }

  private async generateCsv(data: ITherapist[]): Promise<void> {
    const csvWriter = createObjectCsvWriter({
      path: 'therapists.csv',
      header: [
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'zipCode', title: 'Zip Code' },
        { id: 'city', title: 'City' },
        { id: 'email', title: 'Email' },
      ],
    })

    try {
      await csvWriter.writeRecords(data)
      Logger.info('CSV Generated Successfully ')
    } catch (err) {
      Logger.error('Error generating CSV:', err)
    }
  }

  public async addTherapists(req: Request, res: Response): Promise<void> {
    try {
      const data: ITherapist[] = []
      await this.scrapeData(1, data)
      await this.generateCsv(data)

      return createdResponse('CSV is downloaded successfully', res)
    } catch (error) {
      return handleError(error, res, 'Error while adding user.')
    }
  }
}
