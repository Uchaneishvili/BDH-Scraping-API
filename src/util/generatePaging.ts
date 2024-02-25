import { Request } from 'express'
import { CompatibleSortOrder, generateSortQuery } from './generateSortQuery'

export function generatePaging(
  req: Request
): [number, number, Record<string, CompatibleSortOrder>] {
  const skip = Number(req.query.page) || 0
  const limit = Number(req.query.pageSize) || 10
  let sortFields: any
  if (req.query.sortField && req.query.sortOrder) {
    sortFields = { ['' + req.query.sortField]: req.query.sortOrder }
  }
  if (!sortFields) {
    sortFields = { _id: 'descend' }
  }

  const sort = generateSortQuery(sortFields)
  return [skip, limit, sort]
}
