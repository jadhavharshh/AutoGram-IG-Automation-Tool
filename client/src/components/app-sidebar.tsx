import * as React from "react"
import {
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  MessageSquare, Send , MessageCircle, Server, Instagram,
  MapIcon
} from "lucide-react"


import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import userAppStore from "@/store/store" // Import the Zustand store


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { userInfo } = userAppStore()
  const email = userInfo?.email || ""

  const data = {
    user: {
      email: email,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "AutoGram",
        logo: GalleryVerticalEnd,
        plan: "Owned by Harsh Jadhav",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal,
      },
      {
        title: "Profile Scraper",
        url: "/profile-scraper",
        icon: Bot,
      },
      {
        title: "Add Proxies",
        url: "/add-proxies",
        icon: Server,
      },
      {
        title: "Add Instagram Accounts",
        url: "/add-accounts",
        icon: Instagram,
      },
      {
        title: "Generate Messages",
        url: "/generate-messages",
        icon: MessageSquare,
      },
      {
        title: "Send Messages",
        url: "/send-messages",
        icon: Send,
      },
      {
        title: "AI Chatbot",
        url: "/ai-chatbot",
        icon: MessageCircle,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
      },
      {
        title: "Dev Mode",
        url: "/devmode",
        icon: MapIcon,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
