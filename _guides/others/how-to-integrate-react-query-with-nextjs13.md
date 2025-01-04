# How to integrate React Query with NextJS 13

React Query is a popular library for managing data fetching in React. It provides a simple API for fetching data from a server and caching it in memory.

In this guide, we'll show you how to integrate React Query with NextJS 13.

## Step 1: Install React Query

First, install the React Query package:

```sh
yarn add react-query
```

## Step 2: Import React Query

Next, import the QueryClientProvider component:

```jsx
import { QueryClient, QueryClientProvider } from 'react-query'
```

## Step 3: Create a QueryClient

Next, create a QueryClient:

```jsx
const queryClient = new QueryClient()
```

## Step 4: Wrap your app in a QueryClientProvider

Previously we wrapped our whole application with the QueryClientProvider by wrapping the `_app.tsx` file.

But in NextJS 13 app router we don't have `_app.tsx` file. So we need to wrap our whole application with the QueryClientProvider by wrapping the `layout.tsx` file.

First create a `providers.tsx` file under the `app` directory

```jsx
"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

Then import the `Providers` component in the `layout.tsx` file

```jsx
import './globals.css'
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

## Step 5: Use React Query in your JSX

React query provides a powerful `useQuery` hook to fetch data. You need to pass a `queryFn` parameter that will be a function that returns a promise. The promise should resolve to the data you want to fetch.

In this example, we are using `axios` library to fetch data from the server. You can use `fetch` API as well.

```jsx
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function Example() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['data_key'],
    queryFn: () => axios.get('url_endpoint').then((res) => res.data)
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return <div>{data.toString()}</div>
}
```

## Step 6: Use mutation

React query provides a powerful `useMutation` hook to mutate data.

```jsx
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

function Example() {
  const [mutate, { isLoading, error, data }] = useMutation((data) => axios.post('url_endpoint', data), {
    onSuccess: () => {
      // Invalidate and refetch
    }
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      {data.toString()}
      <button onClick={() => mutate(data)}> Update remote</button> // the data is a parameter that will be passed to the
      mutation function
    </div>
  )
}
```
