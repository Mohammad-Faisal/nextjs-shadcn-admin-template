import { IResource, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'
import { ApiEndpoints } from '@/constants/api'

export const resourceClient = {
  ...crudFactory<IResource, QueryOptions, IResource>(ApiEndpoints.RESOURCES)
}
