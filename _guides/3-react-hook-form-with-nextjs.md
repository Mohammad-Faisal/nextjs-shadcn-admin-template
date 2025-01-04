# React hook form with NextJS

## Introduction

In this guide, we will learn how to use React Hook Form with Next.js. We will build a simple form with validation and submit it to a serverless function.

Today we will use [shadcn ui forms](https://ui.shadcn.com/docs/components/form) as our base. It already provides a clean way to use forms. It uses `react-hook-form` under the hood.

## Install dependencies

First, let's install the dependencies we need for this project:

```bash
npx shadcn-ui@latest add form
```

It will install the following dependencies

- react-hook-form: base react hook form
- @hookform/resolvers: resolver for validation
- zod: Validation engine
- tailwindcss-animate: to animate the form

Now we can start building our form.

## Let's create a reusable input

```jsx
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'

interface Props {
  control: any
  name: string
  label: string
  description?: string
}

const InputElement = ({ name, label, description, control }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputElement
```

Now we don't have to write every Form item and Form element every time we want. We can just do the following

```jsx
import { useForm } from 'react-hook-form'
import InputElement from '@/components/ui/form/input'

const { control, handleSubmit } = useForm()

const onSubmit = (data) => {
  console.log(data)
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <InputElement control={control} name="username" label="Username" description="Your username" />
    <InputElement control={control} name="password" label="Password" description="Your password" />
    <button type="submit">Submit</button>
  </form>
)
```

Much cleaner right?

Let's do the same for the other elements

## Date Picker

The basic example is already given in shadcn ui library. We just extract it to a nicely wrapped component.

First, let's install the date picker package

```bash
npx shadcn-ui@latest add popover calendar
```

Then, we need to install another icon package called `lucide-react`. It's a nice icon package with a lot of icons.

```bash
pnpm add lucide-react
```

Now here is our component.

```jsx
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Calendar as CalenderIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

import { Popover } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'

interface Props {
  control: any
  name: string
  label: string
  description?: string
}

const DatePickerElement = ({ name, label, description, control }: Props) => {
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
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    field.value.toLocaleDateString()
                  ) : (
                    // format(field.value, 'PPP')
                    <span>Pick a date</span>
                  )}
                  <CalenderIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DatePickerElement
```

So now you can just use it like the following

```jsx
<DatePickerElement control={control} name="date" label="Date" description="Your date" />
```

How clean?

The basic idea is same for select, radio group and combobox. You can check the source code for those.

Following is the example for select. The only difference is this is taking an array of options. Each option has a label and a value.

```jsx
import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type TOption = {
  label: string
  value: string
}

interface Props {
  name: string
  label: string
  control: any
  options: TOption[]
  description?: string
  placeholder?: string
}

const SelectElement = ({
  name,
  label,
  description,
  options,
  control,
  placeholder,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectElement
```

The combobox and radio group also takes in an array of options. The only difference is the combobox takes a `onSearch` prop and radio group takes a `direction` prop.

An example of this SelectElement will be like the following

```jsx
<SelectElement
  name="email"
  label={'Email'}
  control={form.control}
  options={[
    {
      label: 'First',
      value: 'first@example.com'
    },
    {
      label: 'Second',
      value: 'second@example.com'
    }
  ]}
/>
```

Simple as that.

## Using the forms

Following is an example of using the form.

```jsx
'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from './elements/input-element'
import TextAreaElement from './elements/text-area-element'
import SelectElement from './elements/select-element'
import SwitchElement from './elements/switch-element'
import RadioGroupElement from './elements/radio-group-element'
import DatePickerElement from './elements/date-picker-element'
import ComboboxElement from './elements/combobox-element'



const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  marketing_emails: z.boolean().default(false).optional(),

  eligible: z.boolean(),
  dob: z.date(),
  notification: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
  language: z.string({
    required_error: 'Please select a language.',
  }),
})

const DemoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      description: '',
      eligible: false,
      dob: new Date(),
      notification: 'all',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputElement
          name="username"
          label={'User Name'}
          control={form.control}
        />
        <TextAreaElement
          name="description"
          label={'Description'}
          control={form.control}
        />

        <SwitchElement
          name="marketing_emails"
          control={form.control}
          label={'Marketing Emails'}
          description=""
        />

        <SelectElement
          name="email"
          label={'Email'}
          control={form.control}
          options={[
            {
              label: 'First',
              value: 'first@example.com',
            },
            {
              label: 'Second',
              value: 'second@example.com',
            },
          ]}
        />

        <RadioGroupElement
          name="notification"
          label={'Notify me about'}
          control={form.control}
          options={[
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Mentions',
              value: 'mentions',
            },
            {
              label: 'None',
              value: 'none',
            },
          ]}
        />

        <DatePickerElement
          name="dob"
          control={form.control}
          label={'Date of Birth'}
        />

        <ComboboxElement
          name="language"
          label={'Language'}
          control={form.control}
          form={form}
          placeholder={'Select language'}
          options={[
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' },
          ]}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default DemoForm
```

This is how you can make your forms more reusable.
