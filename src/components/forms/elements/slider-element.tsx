import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import React, { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  name: string
  label?: string
  description?: string
  placeholder?: string
  min: number
  max: number
  step: number
  minStepsBetweenThumbs: number
  setValues: Dispatch<SetStateAction<number[]>>
  values: number[]
}

const SliderElement = ({
  name,
  label,
  description,
  placeholder,
  min,
  max,
  step,
  minStepsBetweenThumbs,
  setValues,
  values
}: Props) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="-mt-2 w-full rounded-md border-2 px-3 py-1 text-start">Select Price Range</div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Price Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="mx-auto flex w-full items-center justify-center p-3">
                  <Slider
                    values={values}
                    onValueChange={(values: number[]) => setValues(values)}
                    min={min}
                    minStepsBetweenThumbs={minStepsBetweenThumbs}
                    max={max}
                    step={step}
                    className="w-[80%]"
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SliderElement
