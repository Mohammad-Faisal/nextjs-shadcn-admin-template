'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import InputElement from '@/components/forms/elements/input-element'
import TextAreaElement from '@/components/forms/elements/text-area-element'
import SelectElement from '@/components/forms/elements/select-element'
import SwitchElement from '@/components/forms/elements/switch-element'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import DatePickerElement from '@/components/forms/elements/date-picker-element'
import ComboboxElement from '@/components/forms/elements/combobox-element'
import NumberInputElement from '@/components/forms/elements/number-input-element'
import MultiSelectElement from '@/components/forms/elements/multiselect-element'
import TabRadioGroup from '@/components/forms/elements/tab-radio-group'
import CustomTabRadioGroup from '@/components/forms/elements/custom-tab-radio-group'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' }
]

const notificationOptions = [
  { label: 'All', value: 'all' },
  { label: 'Mentions', value: 'mentions' },
  { label: 'None', value: 'none' }
]

const tabOptions = [
  { label: 'Personal', value: 'personal' },
  { label: 'Business', value: 'business' }
]

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  email: z.string().email(),
  age: z.number().min(18),
  languages: z.array(z.object({ label: z.string(), value: z.string() })),
  marketingEmails: z.boolean().default(false),
  accountType: z.string(),
  planType: z.string(),
  notification: z.enum(['all', 'mentions', 'none']),
  dob: z.date(),
  language: z.string()
})

const FormDemoPage = () => {
  const [formValues, setFormValues] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      description: '',
      email: '',
      age: 18,
      languages: [],
      marketingEmails: false,
      accountType: 'personal',
      planType: 'basic',
      notification: 'all',
      dob: new Date(),
      language: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormValues(values)
  }

  return (
    <div className="flex min-h-screen w-full gap-8 p-8">
      <div className="w-1/2">
        <h1 className="mb-8 text-2xl font-bold">Form Elements Demo</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputElement name="username" label="Username" placeholder="Enter username" />
            <TextAreaElement name="description" label="Description" placeholder="Enter description" />
            <InputElement name="email" label="Email" placeholder="Enter email" />
            <NumberInputElement name="age" label="Age" min={18} />
            <MultiSelectElement name="languages" label="Languages" options={languages} placeholder="Select languages" />
            <SwitchElement
              name="marketingEmails"
              label="Marketing Emails"
              description="Receive marketing emails from us"
            />
            <TabRadioGroup name="accountType" options={tabOptions} />
            <CustomTabRadioGroup
              name="planType"
              options={[
                { label: 'Basic', value: 'basic' },
                { label: 'Pro', value: 'pro' },
                { label: 'Enterprise', value: 'enterprise' }
              ]}
            />

            <RadioGroupElement name="notification" label="Notification Preferences" options={notificationOptions} />
            <DatePickerElement name="dob" label="Date of Birth" />
            <ComboboxElement
              name="language"
              label="Primary Language"
              placeholder="Select language"
              options={languages}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-1/2">
        <div className="sticky top-8 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Form Values</h2>
          <pre className="whitespace-pre-wrap rounded-md bg-gray-100 p-4">{JSON.stringify(formValues, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default FormDemoPage
