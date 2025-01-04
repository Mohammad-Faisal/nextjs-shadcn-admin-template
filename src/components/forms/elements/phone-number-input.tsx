import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

interface Props {
  name: string
  label: string
  description?: string
  type?: string
}

const PhoneNumberInputElement = ({ name, label, description }: Props) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PhoneInput
              defaultCountry="us"
              value={field.value}
              onChange={field.onChange}
              inputStyle={{
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '15px'
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PhoneNumberInputElement
