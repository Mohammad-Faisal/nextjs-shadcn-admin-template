'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/tables/data-table/data-table-view-options'

import { FacetOption } from './data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import DateRangePickerElement from '@/components/forms/elements/date-range-picker-element'
import { Dispatch, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterKey: string
  facetKey?: string
  facetOptions?: FacetOption[]
  date: DateRange | undefined
  setDate: Dispatch<SetStateAction<DateRange | undefined>>
  showDateFilter?: boolean
}

export function DataTableToolbar<TData>({
  table,
  filterKey,
  facetKey,
  facetOptions,
  date,
  setDate,
  showDateFilter = true
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter with ${filterKey} ...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(filterKey)?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {showDateFilter && <DateRangePickerElement date={date} setDate={setDate} />}

        {facetKey && table.getColumn(facetKey) && (
          <DataTableFacetedFilter column={table.getColumn(facetKey)} title="Status" options={facetOptions ?? []} />
        )}

        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
