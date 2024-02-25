import { IRegexMatchQuery, IRegexQuery } from './common'

export interface IDocumentQuery {
  _id?: string | { $in: string[] }
  $or?: Array<IRegexQuery | IRegexMatchQuery>
}
