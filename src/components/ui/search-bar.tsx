'use client'

import { Input } from './input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef } from 'react'

interface SearchBarProps {
  placeholder?: string
}

export function SearchBar({ placeholder = 'Search...' }: SearchBarProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleSearch = useCallback(
    (term: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams)
        if (term) {
          params.set('search', term)
        } else {
          params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`)
      }, 300)
    },
    [searchParams, pathname, replace]
  )

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search')?.toString()}
      className="max-w-sm"
    />
  )
}
