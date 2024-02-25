import { IDocumentQuery } from '../types/documentQuery'

export function generateSearch<T extends IDocumentQuery>(
  query: T,
  fields: string[],
  searchKey: string
): void {
  if (searchKey) {
    const queryKey = {
      $regex: `.*${searchKey}.*`,
      $options: 'i',
    }

    query.$or = query.$or || []

    fields.forEach((f: string) => {
      query.$or?.push({
        [f]: queryKey,
      })
    })
  }
}
