import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { IPagination } from '@/constants/types'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pagination?: IPagination
}

export function DataTablePagination<TData>({ table, pagination }: DataTablePaginationProps<TData>) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateURLParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value)
    })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handlePageChange = (action: 'next' | 'prev' | 'first' | 'last') => {
    let newPage: number

    switch (action) {
      case 'next':
        newPage = Number(pagination?.page || 1) + 1
        break
      case 'prev':
        newPage = Math.max(1, Number(pagination?.page || 1) - 1)
        break
      case 'first':
        newPage = 1
        break
      case 'last':
        newPage = pagination?.pages || 1
        break
      default:
        newPage = 1
    }

    updateURLParams({ page: String(newPage) })
    table.setPageIndex(newPage - 1)
  }

  const handlePerPageChange = (value: string) => {
    updateURLParams({
      limit: value,
      page: '1' // Reset to first page when changing limit
    })
    table.setPageSize(Number(value))
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {pagination && (
          <div>
            Showing {(Number(pagination.page) - 1) * Number(pagination.limit) + 1} to{' '}
            {Math.min(Number(pagination.page) * Number(pagination.limit), pagination.total)} of {pagination.total}{' '}
            entries
          </div>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${table.getState().pagination.pageSize}`} onValueChange={handlePerPageChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination?.limit || table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {Number(pagination?.page) || table.getState().pagination.pageIndex + 1} of{' '}
          {pagination?.pages || table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange('first')}
            disabled={Number(pagination?.page) === 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange('prev')}
            disabled={Number(pagination?.page) === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange('next')}
            disabled={Number(pagination?.page) === pagination?.pages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange('last')}
            disabled={Number(pagination?.page) === pagination?.pages}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
