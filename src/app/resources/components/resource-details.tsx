import { IResource } from '@/constants/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react'
import { useUrlSearchParams } from '@/hooks/use-url-search-params'
import { FormModes } from '@/constants'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  resource: IResource
}

const ResourceDetails = ({ resource }: Props) => {
  const { updateParams } = useUrlSearchParams()

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resource Details</CardTitle>
        <Button
          variant="outline"
          onClick={() => updateParams({ mode: FormModes.UPDATE })}
          className="flex items-center gap-2"
        >
          <EditIcon className="h-4 w-4" /> Update
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <p className="text-sm font-medium">Name</p>
            <p>{resource.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Description</p>
            <p>{resource.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Website</p>
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {resource.website}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium">Image</p>
            <div className="relative h-40 w-full overflow-hidden rounded-md">
              <Image src={resource.image} alt={resource.name} fill className="object-cover" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Created At</p>
            <p>{formatDate(resource.created_at.toString())}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Updated At</p>
            <p>{formatDate(resource.updated_at.toString())}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResourceDetails
