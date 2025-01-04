import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useFormContext } from 'react-hook-form'
import { TOption } from '@/constants/types'

interface Props {
  name: string
  options: TOption[]
  description?: string
  placeholder?: string
  className?: string
}

const CustomTabRadioGroup = ({ name, options, className }: Props) => {
  const { control } = useFormContext()
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                defaultValue={field.value}
                onValueChange={field.onChange}
                className={`flex items-center justify-between rounded-full bg-primary`}
              >
                {options.map((option) => (
                  <FormItem key={option.value} className="flex w-full items-center space-x-1 space-y-0 p-1">
                    <FormControl>
                      <RadioGroupItem value={option.value.toString()} className="hidden" />
                    </FormControl>
                    <FormLabel
                      className={`w-full cursor-pointer rounded-full px-4  py-2 text-center text-[10px] font-medium  md:text-[16px] ${
                        field.value === option.value ? 'bg-white text-primary' : 'text-white'
                      }`}
                    >
                      {option.label}
                    </FormLabel>
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

export default CustomTabRadioGroup
