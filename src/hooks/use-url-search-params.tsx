import { PageRoutes } from '@/constants/page-routes'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
export const useUrlSearchParams = () => {
  const searchParams = useSearchParams()

  const router = useRouter()
  const pathname = usePathname()

  const updateParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value)
    })
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const getParam = (key: string) => {
    return searchParams.get(key)
  }

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(key, value)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const resetToNewParam = (key: string, value: string) => {
    const newParams = new URLSearchParams()
    newParams.set(key, value)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const deleteParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(key)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return { searchParams, updateParams, getParam, setParam, deleteParam, resetToNewParam }
}
