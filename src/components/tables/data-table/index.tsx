'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'

import { DataTablePagination } from '@/components/tables/data-table/data-table-pagination'
import { DataTableToolbar } from '@/components/tables/data-table/data-table-toolbar'
import Loader from '@/components/loader'
import { FacetOption } from './data'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { FormModes } from '@/constants'
import { useUrlSearchParams } from '@/hooks/use-url-search-params'
import { IPagination } from '@/constants/types'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  filterKey?: string
  facetKey?: string
  facetOptions?: FacetOption[]
  showFilters?: boolean
  showPagination?: boolean
  showDateFilter?: boolean
  title?: string
  titleClassName?: string
  pagination?: IPagination
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  filterKey,
  facetKey,
  facetOptions,
  pagination,
  showFilters = true,
  showDateFilter = true,
  showPagination = true,
  title,
  titleClassName
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [date, setDate] = React.useState<DateRange | undefined>()
  const [tableData, setTableData] = React.useState<TData[]>(data)

  React.useEffect(() => {
    if (data) {
      setTableData(data)
    }
    if (date && date?.from && date?.to) {
      const from = date?.from?.toISOString()
      const to = date?.to?.toISOString()
      // @ts-ignore
      const filteredData = data.filter((item) => item.createdAt > from && item.createdAt < to)
      setTableData(filteredData)
    }
  }, [date, data])

  const table = useReactTable({
    data: tableData ?? data,
    columns,
    pageCount: pagination?.pages ?? -1,
    manualPagination: !!pagination,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: pagination ? Number(pagination.page) - 1 : 0,
        pageSize: pagination ? Number(pagination.limit) : 50
      }
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  const { resetToNewParam } = useUrlSearchParams()

  return (
    <div className="h-full flex-1 space-y-4 rounded-md bg-white">
      <div className="flex items-center justify-between">
        {title && (
          <>
            <h3 className={cn('text-2xl font-medium', titleClassName)}>{title}</h3>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => resetToNewParam('mode', FormModes.CREATE)}
            >
              <PlusIcon className="h-4 w-4" /> Create New
            </Button>
          </>
        )}
      </div>

      {showFilters && (
        <DataTableToolbar
          date={date}
          setDate={setDate}
          table={table}
          filterKey={filterKey ?? 'email'}
          facetKey={facetKey ?? 'status'}
          facetOptions={facetOptions}
          showDateFilter={showDateFilter}
        />
      )}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows?.length && !isLoading ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && pagination && <DataTablePagination table={table} pagination={pagination} />}
    </div>
  )
}
