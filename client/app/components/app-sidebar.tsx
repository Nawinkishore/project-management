"use client"
import { Home, ChartGantt, Search, Settings, User2, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Timeline",
        url: "/dashboard/timeline",
        icon: ChartGantt,
    },
    {
        title: "Search",
        url: "/dashboard/search",
        icon: Search,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: User2,
    },
    {
        title: "Teams",
        url: "/dashboard/teams",
        icon: Users,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar>
            <SidebarHeader className="p-4 text-xl flex-row items-center justify-between ">
                <div>
                    Nawin Saas
                </div>
                {/* <SidebarTrigger /> */}
            </SidebarHeader>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className={pathname === item.url ? "bg-accent/50" : ""}>
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