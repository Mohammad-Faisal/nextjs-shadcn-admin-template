export type TODO = any

export interface QueryOptions {
  limit?: number
  page?: number
  orderBy?: string
  search?: string
  sortedBy?: SortOrder
}

export interface IPagination {
  limit: number | string
  page: number | string
  pages: number
  total: number
}

export interface SuccessResponse<T> {
  data: T
  message: string
  statusCode: number
}

export type TOption = {
  label: string
  value: string | number
}

export interface QueryOptions {
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export interface IResource {
  id: number
  name: string
  description: string
  website: string
  image: string
  created_at: string | Date
  updated_at: string | Date
}
