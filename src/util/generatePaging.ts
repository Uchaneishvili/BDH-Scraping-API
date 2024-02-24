import { Request } from 'express'
import { generateSortQuery, ISortParam } from './generateSortQuery'

export function generatePaging(req: Request): [number, number, ISortParam] {
  const skip = Number(req.query.page) || 0
  const limit = Number(req.query.pageSize) || 25
  let sortFields = {}
  if (req.query.sortField && req.query.sortOrder) {
    sortFields = { ['' + req.query.sortField]: req.query.sortOrder }
  }

  const sort = generateSortQuery(sortFields)
  return [skip, limit, sort]
}
