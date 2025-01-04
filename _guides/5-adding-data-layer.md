First install the dependencies

```sh
 pnpm add @tanstack/react-query axios
```

Then Create the HttpClient. Feel free to change the toaster to your own.

```js
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { LocalStorageKeys } from '@/constants/local-storage-keys'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN ?? '')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
})

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error: any) => {
    const { toast } = useToast()
    if (error.response) {
      console.error(error.response.data)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response.data?.message,
      })
    } else if (error.request) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'No response was received.',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'No response was received.',
        description: 'error.response.data?.message',
      })
    }
    return Promise.reject(error)
  },
)

export default class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await axiosClient.get<T>(url, { params })
    return response
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await axiosClient.post<T>(url, data, options)
    return response
  }

  static async put<T>(url: string, data: unknown) {
    const response = await axiosClient.put<T>(url, data)
    return response
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await axiosClient.patch<T>(url, data)
    return response
  }

  static async delete<T>(url: string) {
    const response = await axiosClient.delete<T>(url)
    return response
  }
}

```

Then create the crudFactory

```js
import HttpClient from './http-client'

export interface GetBySlugParams {
  slug: string
}

export interface GetByIdParams {
  id: number
}

export interface PaginatorInfo<T> {
  data: T[]
  total: number
}

export function crudFactory<Type, QueryParams, InputType>(endpoint: string) {
  return {
    async all(params?: QueryParams) {
      return await HttpClient.get<Type[]>(endpoint, params)
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params)
    },
    getBySlug({ slug }: GetBySlugParams) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`)
    },
    getById({ id }: GetByIdParams) {
      return HttpClient.get<Type>(`${endpoint}/${id}`)
    },
    create(data: InputType) {
      return HttpClient.post<Type>(endpoint, data)
    },
    update({ id, ...input }: Partial<InputType> & { id: number }) {
      return HttpClient.patch<Type>(`${endpoint}/${id}`, input)
    },
    delete(id: number) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`)
    },
  }
}

```

Initialize react query on the client side. Create a Provider under the app/providers.tsx tile

```ts
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

Then use it in the layout.tsx file

```ts
import Providers from './providers'


// and inside the return

return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
      <Toaster />
    </html>
  )
```

Now create a client for a particular resource

```ts
import { QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'

interface CreateUserInput {}

export const userClient = {
  ...crudFactory<User, QueryOptions, CreateUserInput>(ApiEndpoints.USERS)
}
```

Then a reusable hook to use it.

```ts
export function useGetUsers() {
  const { isLoading, data } = useQuery({
    queryKey: [ApiEndpoints.USERS],
    queryFn: () => userClient.all()
  })

  return { users: data?.data, loading: isLoading }
}
```
