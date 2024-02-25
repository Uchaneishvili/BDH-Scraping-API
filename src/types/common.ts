export interface IRegexQuery {
  [key: string]: {
    $regex: string
    $options: string
  }
}

export interface IRegexMatchQuery {
  $expr: {
    $regexMatch: {
      input: unknown
      regex: string
      options: string
    }
  }
}
