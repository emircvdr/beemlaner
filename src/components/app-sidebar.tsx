import { Box, ChevronRight, CircleDotDashed, Inbox, LayoutDashboardIcon, Plus, UsersRound, } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { WorkspacesSwitcher } from "./workspaces-switcher"
import { NavUser } from "./nav-user"
import { useNavigate } from "@tanstack/react-router"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"


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



export function AppSidebar({ user, workspaces, userAvatarOptions, firstWorkspace, currentWorkspace }: { user: User, workspaces: Workspace[], userAvatarOptions: any, firstWorkspace: string, currentWorkspace: string }) {
    const navigate = useNavigate()

    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>
                <WorkspacesSwitcher workspaces={workspaces} firstWorkspace={firstWorkspace} currentWorkspace={currentWorkspace} />
            </SidebarHeader>
            <SidebarContent className="mt-2">
                <SidebarMenu className="pl-2">
                    <SidebarMenuButton className="">
                        <Inbox className="size-4!" />
                        <p className="text-xs">Inbox</p>
                    </SidebarMenuButton>
                    <SidebarMenuButton className="">
                        <CircleDotDashed className="size-4!" />
                        <p className="text-xs">My Issues</p>
                    </SidebarMenuButton>
                </SidebarMenu>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <p className="text-xs">Workspace</p>
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuButton className="" onClick={() => navigate({ to: '/$id', params: { id: currentWorkspace } })}>
                            <LayoutDashboardIcon className="size-4!" />
                            <p className="text-xs">Dashboard</p>
                        </SidebarMenuButton>
                        <SidebarMenuButton className="">
                            <UsersRound className="size-4!" />
                            <p className="text-xs">Groups</p>
                        </SidebarMenuButton>
                        <SidebarMenuButton className="">
                            <Box className="size-4!" />
                            <p className="text-xs">Projects</p>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel >Your Groups</SidebarGroupLabel>
                    <SidebarGroupAction title="Create Group">
                        <Plus /> <span className="sr-only">Create Group</span>
                    </SidebarGroupAction>
                    <SidebarMenu>
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger className="w-full flex items-center justify-between">
                                    <SidebarMenuButton>
                                        <UsersRound className="size-4!" />
                                        <p className="text-xs">Group 1</p>
                                        <ChevronRight className="size-4! ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem className="flex flex-col gap-2">
                                            <SidebarMenuButton className="w-full" size="sm">
                                                <CircleDotDashed className="size-4!" />
                                                <p className="text-xs">Issues</p>
                                            </SidebarMenuButton>
                                            <SidebarMenuButton className="w-full" size="sm">
                                                <Box className="size-4!" />
                                                <p className="text-xs">Projects</p>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} userAvatarOptions={userAvatarOptions} />
            </SidebarFooter>
        </Sidebar>
    )
}
