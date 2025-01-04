import { IPagination } from '@/constants/types'
import HttpClient from './http-client'

export interface GetBySlugParams {
  slug: string
}

export interface GetByIdParams {
  id: number
}

export interface PaginatorInfo<T> {
  items: T[]
  pagination: IPagination
}

export function crudFactory<Type, QueryParams, InputType>(endpoint: string) {
  return {
    all(params?: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params)
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params)
    },
    getBySlug({ slug }: GetBySlugParams) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`)
    },
    getById({ id }: GetByIdParams) {
      return HttpClient.get<Type>(`${endpoint}/${id}`)
    },
    create(data: InputType) {
      return HttpClient.post<Type>(endpoint, data)
    },
    update({ id, ...input }: Partial<InputType> & { id: number }) {
      return HttpClient.patch<Type>(`${endpoint}/${id}`, input)
    },
    delete(id: number) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`)
    }
  }
}
