# All about search parameters in Next.js 13

Today we will see how we can use search parameters in Next.js 13.

## What are search parameters?

Search parameters are the part of the URL that comes after the `?` character. For example, in the URL `https://example.com/?q=nextjs`, the search parameter is `q=nextjs`.

## Why do we need search parameters?

Search parameters are useful when we want to pass some data to a page. For example, we can pass the search query to a search page using search parameters.

This allows us to create a sharable link to a page with some data. For example, we can create a link to a search page with the search query already filled in.

## How to use search parameters in Next.js 13?

There are several ways to use search parameters in Next.js 13. Let's see them one by one.

## Using Link

When you are using Link, you can pass the search parameters as the `href` prop. For example, if you want to pass the search query to a search page, you can do it like this:

```jsx
<Link href="/search?q=nextjs">
  <a>Search for Next.js</a>
</Link>
```

You can do it with dynamic routes as well. For example, if you want to pass 2 search queries to a search page, you can do it like this:

```jsx
<Link
  href={{
    pathname: '/search',
    query: { locationId, categoryId }
  }}
>
  Location Name
</Link>
```

This will generate a URL like this: `/search?locationId=1&categoryId=2`.

## Dynamic search parameters

You can also use dynamic search parameters. For example, if you want to pass the search query to a search page, you can do it like this:

```jsx
<Link href="/search?q=[searchTerm]" as={`/search?q=${searchTerm}`}>
  <a>Search for {searchTerm}</a>
</Link>
```

## Accessing the search parameters

NextJS 13 provides a hook called `useSearchParams` to access the search parameters.

```jsx
import { useSearchParams } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('searchTerm') ?? ''

  return <div>Search query: {searchTerm}</div>
}
```
