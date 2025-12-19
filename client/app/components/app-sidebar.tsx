"use client"
import { Home, ChartGantt, Search, Settings, User2, Users ,FolderKanban,ChevronDown,ChevronUp } from "lucide-react"
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
import { useGetProjects } from "@/features/projects/api"
import { useState } from "react"

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
    const { data: fetchProjects } = useGetProjects();
    const [showProjects,setShowProjects] = useState(false);
    console.log("Projects in sidebar:", fetchProjects);
    return (
        <Sidebar className="overflow-y-auto">
            <SidebarHeader className="p-4 text-xl flex-row items-center justify-between ">
                <div>
                    <h1 className="text-xl font-medium text-muted-foreground">Project Management</h1>
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
                    <SidebarGroupLabel className="flex justify-between">Projects <span onClick={() => setShowProjects(!showProjects)}>{showProjects ? <ChevronUp /> : <ChevronDown />}</span></SidebarGroupLabel>
                    {showProjects && <SidebarGroupContent>
                        <SidebarMenu>
                            {fetchProjects?.map((project)=>(
                                <SidebarMenuItem key={project.id}>
                                    <SidebarMenuButton asChild className={pathname === `/dashboard/projects/${project.id}` ? "bg-accent/50" : ""}>
                                        <Link href={`/dashboard/projects/${project.id}`}>
                                            <FolderKanban />
                                            <span>{project.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        </SidebarGroupContent>}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}