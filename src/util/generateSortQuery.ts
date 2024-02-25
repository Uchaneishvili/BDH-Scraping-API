import { SortOrder } from 'mongoose'

export type CompatibleSortOrder = 1 | -1

export interface ISortParam {
  [key: string]: SortOrder | string // Mongoose's SortOrder or string
}

export function generateSortQuery(
  sortParams: ISortParam,
  defaultSort: Record<string, CompatibleSortOrder> = { createdAt: -1 }
): Record<string, CompatibleSortOrder> {
  let sort: Record<string, CompatibleSortOrder> = {}

  const sortValues: Record<string, CompatibleSortOrder> = {
    ascend: 1,
    descend: -1,
  }

  if (Object.keys(sortParams).length) {
    for (const key in sortParams) {
      const sortOrder = sortParams[key]
      sort[key] =
        typeof sortOrder === 'string' ? sortValues[sortOrder] || -1 : sortOrder
    }
  } else {
    sort = defaultSort
  }

  return sort
}
