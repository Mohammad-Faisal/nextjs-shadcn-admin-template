import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TOption } from '@/constants/types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

interface Props {
  name: string
  label?: string
  description?: string
  placeholder?: string
  type?: string
  options: TOption[]
  disabled?: boolean
}

const MultiSelectElement = ({ name, label, description, placeholder, options, disabled = false }: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Select
                isDisabled={disabled}
                value={field.value}
                onChange={field.onChange}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                placeholder={placeholder}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default MultiSelectElement
