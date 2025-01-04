import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiEndpoints, DEFAULT_PAGE_SIZE } from '@/constants/api'
import { resourceClient } from './resourceClient'
import { IResource } from '@/constants/types'
import { useUrlSearchParams } from '@/hooks/use-url-search-params'
import getQueryClient from '@/lib/get-query-client'

export const useResourcesClient = () => {
  const { deleteParam, getParam } = useUrlSearchParams()
  const queryClient = getQueryClient()

  const search = getParam('search') ?? undefined
  const page = Number(getParam('page') ?? 1)
  const limit = Number(getParam('limit') ?? DEFAULT_PAGE_SIZE)

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: [ApiEndpoints.RESOURCES],
      exact: true,
      refetchType: 'all'
    })
  }

  const { isPending: isGetPending, data } = useQuery({
    queryKey: [ApiEndpoints.RESOURCES, search, page, limit],
    queryFn: () => resourceClient.paginated({ search, page, limit })
  })

  const { mutate: createResource, isPending: isCreatePending } = useMutation({
    mutationFn: (data: IResource) => resourceClient.create(data),
    onSuccess: () => {
      deleteParam('mode')
      refetch()
    }
  })

  const { mutate: updateResource, isPending: isUpdatePending } = useMutation({
    mutationFn: (data: Partial<IResource> & { id: number }) => resourceClient.update(data),
    onSuccess: () => {
      deleteParam('mode')
      refetch()
    }
  })

  const { mutate: deleteResource, isPending: isDeletePending } = useMutation({
    mutationFn: (id: number) => resourceClient.delete(id),
    onSuccess: () => {
      refetch()
      deleteParam('resourceId')
    }
  })

  const resources = (data?.items || []) as IResource[]

  return {
    resources,
    pagination: data?.pagination,
    createResource,
    updateResource,
    deleteResource,
    isGetPending,
    isCreatePending,
    isUpdatePending,
    isDeletePending
  }
}
