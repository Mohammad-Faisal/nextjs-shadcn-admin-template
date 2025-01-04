import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label?: string
  description?: string
  placeholder?: string
  className?: string
  isDisabled?: boolean
  rows?: number
}

const TextAreaElement = ({ name, label, description, placeholder, className, isDisabled = false, rows = 5 }: Props) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea placeholder={placeholder} className={className} {...field} disabled={isDisabled} rows={rows} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextAreaElement
