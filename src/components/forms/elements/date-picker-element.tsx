import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Calendar as CalenderIcon, X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

import { Popover } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { PopoverClose, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CustomCalendar } from '@/components/ui/custom-calendar'

interface Props {
  name: string
  label: string
  description?: string
  disabled?: boolean
  custom?: boolean
}

const DatePickerElement = ({ name, label, description, disabled = false, custom = false }: Props) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  disabled={disabled}
                >
                  {field.value ? field?.value?.toLocaleDateString() : <span>Pick a date</span>}
                  <CalenderIcon className="ml-auto h-4 w-4" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full bg-slate-950 p-0 text-white/80" align="start">
              <div className="flex pr-2 pt-2">
                <div className="flex-1"></div>
                <PopoverClose>
                  <X size={24} className="text-primary/60 hover:text-destructive" />
                </PopoverClose>
              </div>
              {custom ? (
                <CustomCalendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={field.value}
                  onSelect={field.onChange}
                  fromYear={1960}
                  toYear={2030}
                />
              ) : (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={
                    !disabled
                      ? (date) => date > new Date() || date < new Date('1900-01-01')
                      : (date) => date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              )}
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DatePickerElement
