export interface Rows {
  data: RowData[]
  meta: Meta
}

export interface RowData {
  id: number
  uuid: string
  space: string
  info: Info[]
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}

export type Info = Record<string, any>
export interface Columns {
  data: ColumnData[]
  meta: Meta
}

export interface ColumnData {
  id: number
  uuid: number
  name: string
  space: string
  color: string
  fieldId: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  subHeaders: SubHeader[]
}

export interface SubHeader {
  id: number
  name: string
  color: string
  fieldId: string
  type: string
}

export interface ColumnSubHeaders {
  data: ColumnSubHeaderData[]
  meta: Meta
}

export interface Datum {
  id: number
  uuid: string
  name: string
  color: string
  type: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
