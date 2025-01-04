import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import Providers from './providers'

import './globals.css'
import SideNavBar from '@/components/navigation/side-nav'
import { SidebarTrigger } from '@/components/ui/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS Admin Template with Shadcn UI and React Query',
  description: ''
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen flex-col`}>
        <Providers>
          <SideNavBar />
          <main className="flex h-full w-full flex-1 px-2 py-6">
            <SidebarTrigger />
            {children}
          </main>
        </Providers>
      </body>
      <Toaster />
    </html>
  )
}
