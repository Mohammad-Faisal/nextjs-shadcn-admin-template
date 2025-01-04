import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IResource } from '@/constants/types'
import { Form } from '@/components/ui/form'
import InputElement from '@/components/forms/elements/input-element'
import { Button } from '@/components/ui/button'
import TextAreaElement from '@/components/forms/elements/text-area-element'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.'
  }),
  website: z.string().url({
    message: 'Please enter a valid website URL.'
  }),
  image: z.string().min(2, {
    message: 'Image URL must be at least 2 characters.'
  })
})

interface ResourceFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  resource?: IResource
  isLoading?: boolean
}

const ResourceForm = ({ onSubmit, resource, isLoading }: ResourceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: resource?.name,
      description: resource?.description,
      website: resource?.website,
      image: resource?.image
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputElement name="name" label="Name" />
        <TextAreaElement name="description" label="Description" />
        <InputElement name="website" label="Website URL" />
        <InputElement name="image" label="Image URL" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

export default ResourceForm
