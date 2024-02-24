export interface ISortParam {
  [key: string]: number | string
}
export function generateSortQuery(sortParams: ISortParam): ISortParam {
  let sort: ISortParam = {}
  const sortValues: ISortParam = {
    asc: 1,
    ascend: 1,
    desc: -1,
    descend: -1,
  }

  if (Object.keys(sortParams).length) {
    for (const key in sortParams) {
      sort[key] = sortValues[sortParams[key]]
    }
  } else {
    sort = {
      createdAt: -1,
    }
  }

  return sort
}
