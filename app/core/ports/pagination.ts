export interface Paginate {
  page: number
  perPage: number
}

export interface Pagination<T> extends Paginate {
  total: number
  data: T[]
}
