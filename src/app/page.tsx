'use client'

import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="w-full overflow-x-hidden">
      <div className="relative flex min-h-screen flex-col items-center justify-center space-y-8 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome to the Dashboard</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Get started by exploring resources and tools</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={PageRoutes.RESOURCES}
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View Resources
          </Link>
        </div>
      </div>
    </section>
  )
}
