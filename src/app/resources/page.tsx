'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormModes } from '@/constants'
import { IResource } from '@/constants/types'
import { useUrlSearchParams } from '@/hooks/use-url-search-params'
import ResourcesTable from './components/resources-table'
import ResourceDetails from './components/resource-details'
import ResourceForm from './components/resource-form'
import { useResourcesClient } from './data/useResourcesClient'

const Page = () => {
  const {
    resources,
    isGetPending,
    createResource,
    updateResource,
    deleteResource,
    isCreatePending,
    isUpdatePending,
    isDeletePending,
    pagination
  } = useResourcesClient()

  const { getParam, deleteParam } = useUrlSearchParams()
  const mode = getParam('mode')
  const resourceId = getParam('resourceId')

  const handleSubmit = (data: Partial<IResource>) => {
    if (mode === FormModes.CREATE) {
      createResource(data as IResource)
    } else if (mode === FormModes.UPDATE) {
      updateResource({ ...data, id: Number(resourceId) } as IResource)
    }
  }

  const selectedResource = resourceId ? resources.find((resource) => resource.id === Number(resourceId)) : undefined

  return (
    <div className="flex w-full flex-col gap-4">
      <ResizablePanelGroup direction="horizontal" className="flex gap-2">
        <ResizablePanel>
          <ResourcesTable
            data={resources}
            loading={isGetPending}
            onDelete={deleteResource}
            isDeleting={isDeletePending}
            pagination={pagination}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>{selectedResource && <ResourceDetails resource={selectedResource} />}</ResizablePanel>
      </ResizablePanelGroup>

      <Dialog
        open={getParam('mode') === FormModes.CREATE || getParam('mode') === FormModes.UPDATE}
        onOpenChange={() => deleteParam('mode')}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getParam('mode') === FormModes.CREATE ? 'Add New Resource' : 'Update Resource'}</DialogTitle>
          </DialogHeader>
          <ResourceForm
            onSubmit={handleSubmit}
            resource={selectedResource}
            isLoading={isCreatePending || isUpdatePending}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Page
