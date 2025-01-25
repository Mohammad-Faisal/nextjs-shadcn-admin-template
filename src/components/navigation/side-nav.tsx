import React from 'react'
import {
  BellRing,
  Bird,
  Book,
  Bot,
  ChevronDown,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareUser,
  Terminal,
  Triangle,
  Turtle,
  TurtleIcon,
  Users,
  MessageSquare,
  MessageSquarePlus,
  CreditCard,
  Code,
  CodepenIcon
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from '@/components/ui/sidebar'

import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'

const adminItems = [
  {
    icon: Users,
    title: 'Users',
    url: PageRoutes.USERS
  },
  {
    icon: Users,
    title: 'Forms',
    url: PageRoutes.FORMS
  }
]

const miscItems = [
  {
    icon: Settings2,
    title: 'Resources',
    url: PageRoutes.RESOURCES
  }
]

const SideNavBar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Shadcn UI Admin Template</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Misc</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {miscItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideNavBar
