import React, { ChangeEvent } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Controller, useFormContext } from 'react-hook-form'
import { TOption } from '@/constants/types'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  label: string
  options: TOption[]
  description?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

const RadioGroupElement = ({ name, label, options, className, disabled = false }: Props) => {
  const { control } = useFormContext()
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <RadioGroup
                defaultValue={field.value ?? null}
                onValueChange={field.onChange}
                className={cn('flex', className)}
              >
                {options.map((option) => (
                  <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem disabled={disabled} value={option.value.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal">{option.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default RadioGroupElement
