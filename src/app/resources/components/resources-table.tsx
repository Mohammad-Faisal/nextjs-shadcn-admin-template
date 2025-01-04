'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/tables/data-table'
import { IPagination, IResource } from '@/constants/types'
import { DataTableColumnHeader } from '@/components/tables/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { useUrlSearchParams } from '@/hooks/use-url-search-params'
import ConfirmDeleteDialog from '@/components/dialogs/confirm-delete-dialog'
import { Badge } from '@/components/ui/badge'
import { Eye, Trash2 } from 'lucide-react'

interface Props {
  data: IResource[]
  loading: boolean
  onDelete: (id: number) => void
  isDeleting: boolean
  pagination: IPagination | undefined
}

export default function ResourcesTable({ data, loading, onDelete, isDeleting, pagination }: Props) {
  const { updateParams } = useUrlSearchParams()

  const columns: ColumnDef<IResource>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => <Badge>{row.original.description}</Badge>
    },
    {
      accessorKey: 'website',
      header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          <a
            href={row.original.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {row.original.website}
          </a>
        </div>
      )
    },
    {
      id: 'view-details',
      cell: ({ row }) => {
        return (
          <Button variant="outline" onClick={() => updateParams({ resourceId: row.original.id.toString() })}>
            <Eye className="h-4 w-4" />
          </Button>
        )
      }
    },
    {
      id: 'delete',
      cell: ({ row }) => {
        return (
          <ConfirmDeleteDialog
            onDelete={() => onDelete(row.original.id)}
            isLoading={isDeleting}
            anchor={
              <Button variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        )
      }
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      showDateFilter={false}
      showPagination={true}
      isLoading={loading}
      filterKey="name"
      title="Resources"
      pagination={pagination}
    />
  )
}
