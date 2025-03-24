import { AudioWaveform, Box, CircleDotDashed, Command, GalleryVerticalEnd, Inbox, LayoutDashboardIcon, } from "lucide-react"


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


const workspaces = [
    {
        name: "Beem",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
    },
    {
        name: "PrimeTek",
        logo: AudioWaveform,
        plan: "Free",
    },
    {
        name: "Besiktas",
        logo: Command,
        plan: "Startup",
    },
]

interface User {
    fullname: string
    email: string
    sub: string
    full_name: string
    avatar_url?: string
}


export function AppSidebar({ user }: { user: User }) {

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
                        <SidebarMenuButton className="">
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
