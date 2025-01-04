'use client'
import { toast } from '@/components/ui/use-toast'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

const getQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) => {
        console.log(error)
        toast({
          variant: 'destructive',
          title: error.response.data.message,
          description: error.response.data.details
        })
        console.log({ error })
      }
    }),
    mutationCache: new MutationCache({
      onError: (error: any) => {
        console.log(error)
        toast({
          variant: 'destructive',
          title: error.response.data.message,
          description: error.response.data.details
        })
        console.log({ error })
      },
      onSuccess: (data: any) => {
        console.log('global success', data)
        toast({
          title: 'Operation successful',
          description: 'Operation successful'
        })
      }
    }),
    defaultOptions: {
      mutations: {
        onError: (error: any) => {
          console.log(error)
          toast({
            variant: 'destructive',
            title: error.response.data.message,
            description: error.response.data.details
          })
          console.log({ error })
        }
      }
    }
  })
export default getQueryClient
