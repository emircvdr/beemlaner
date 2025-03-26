import { Box, CircleDotDashed, Inbox, LayoutDashboardIcon, } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { WorkspacesSwitcher } from "./workspaces-switcher"
import { NavUser } from "./nav-user"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"


interface User {
    fullname: string
    email: string
    sub: string
    full_name: string
    avatar_url?: string
}

interface Workspace {
    workplace_uuid: string
    name: string
    color: string
    icon: string
    plan: string
    admin_id: string
}

export function AppSidebar({ user, workspaces }: { user: User, workspaces: Workspace[] }) {
    const navigate = useNavigate()

    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>
                <WorkspacesSwitcher workspaces={workspaces} />
            </SidebarHeader>
            <SidebarContent className="mt-2">
                <SidebarMenu className="pl-2">
                    <SidebarMenuButton className="">
                        <Inbox className="size-4!" />
                        <p className="text-xs">Inbox</p>
                    </SidebarMenuButton>
                    <SidebarMenuButton className="">
                        <CircleDotDashed className="size-4!" />
                        <p className="text-xs">My All Issues</p>
                    </SidebarMenuButton>
                </SidebarMenu>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <p className="text-xs">Workspaces</p>
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuButton className="" onClick={() => navigate({ to: '/' })}>
                            <LayoutDashboardIcon className="size-4!" />
                            <p className="text-xs">Dashboard</p>
                        </SidebarMenuButton>
                        <SidebarMenuButton className="">
                            <Box className="size-4!" />
                            <p className="text-xs">Projects</p>
                        </SidebarMenuButton>
                        <SidebarMenuButton className="">
                            <CircleDotDashed className="size-4!" />
                            <p className="text-xs">Issues</p>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
