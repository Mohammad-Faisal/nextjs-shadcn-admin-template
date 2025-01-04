import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label?: string
  description?: string
  placeholder?: string
  min?: number
}

const NumberInputElement = ({ name, label, description, placeholder, min = 0 }: Props) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              min={min}
              type="number"
              placeholder={placeholder}
              {...field}
              onChange={(event) => field.onChange(Number(event.target.value))}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default NumberInputElement
