import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { TOption } from '@/constants/types'
import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label?: string
  options: TOption[]
  selectedBoxes: TOption[]
  setSelectedBoxes: Dispatch<SetStateAction<TOption[]>>
  classNames?: string
}
const MultiSelectCheckbox = ({ name, options, selectedBoxes, setSelectedBoxes, classNames, label }: Props) => {
  const { control } = useFormContext()

  const handleCheckboxChange = (checkedOption: TOption, checked: boolean) => {
    if (checked) {
      setSelectedBoxes([...selectedBoxes, checkedOption])
    } else {
      setSelectedBoxes(selectedBoxes.filter((item) => item.value !== checkedOption.value))
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className='flex flex-col gap-2'>
          {label && <FormLabel>{label}</FormLabel>}
          <div className={`grid ${classNames} gap-y-4 space-y-0`}>
            {options.map((option) => (
              <FormField
                key={option.value}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem key={option.value} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={selectedBoxes?.some((item) => item.value === option.value)}
                          onCheckedChange={(checked) => {
                            handleCheckboxChange(option, Boolean(checked))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{option.label}</FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  )
}

export default MultiSelectCheckbox
