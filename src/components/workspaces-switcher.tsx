import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import * as LucideIcons from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { WorkspaceCreateDialog } from "./workspaceCreateDialog"
import { useNavigate } from "@tanstack/react-router"


export function WorkspacesSwitcher({
    workspaces,
}: {
    workspaces: {
        workplace_uuid: string
        name: string
        color: string
        icon: string
        plan: string
    }[]
}) {
    const navigate = useNavigate()
    const { isMobile } = useSidebar()
    const [activeWorkspace, setActiveWorkspace] = React.useState(workspaces.length > 0 ? workspaces[0] : null)

    const getIconComponent = (iconName: string) => {
        return LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.FileIcon
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {activeWorkspace ? (
                                <>
                                    <div
                                        className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
                                        style={{ backgroundColor: activeWorkspace.color }}
                                    >
                                        {React.createElement(getIconComponent(activeWorkspace.icon) as React.ElementType, { className: 'size-4' })}
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {activeWorkspace.name}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground capitalize ">{activeWorkspace.plan}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 text-left text-sm leading-tight">
                                    <span className="font-semibold">No workspaces</span>
                                    <span className="block text-xs text-muted-foreground">Create one to get started</span>
                                </div>
                            )}
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Workspaces
                        </DropdownMenuLabel>
                        {workspaces.length > 0 ? (
                            workspaces.map((workspace, index) => (
                                <DropdownMenuItem
                                    key={workspace.name}
                                    onClick={() => setActiveWorkspace(workspace)}
                                    className="gap-2 p-2"
                                >
                                    <div
                                        className="flex size-6 items-center justify-center rounded-sm border"
                                        style={{ backgroundColor: workspace.color }}
                                    >
                                        {React.createElement(getIconComponent(workspace.icon) as React.ElementType, { className: 'size-4 text-white' })}
                                    </div>
                                    {workspace.name}
                                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <DropdownMenuItem disabled className="p-2 text-sm text-muted-foreground">
                                No workspaces available
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2" onSelect={(e) => e.preventDefault()}>
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <WorkspaceCreateDialog trigger={
                                <div className="font-medium text-muted-foreground">Add workspace</div>
                            } />
                        </DropdownMenuItem>
                        {activeWorkspace && (
                            <DropdownMenuItem
                                className="gap-2 p-2"
                                onSelect={() =>
                                    navigate({
                                        to: "/workspaces/$id",
                                        params: {
                                            id: activeWorkspace.workplace_uuid
                                        }
                                    })
                                }
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <LucideIcons.Settings className="size-4" />
                                </div>
                                <div className="font-medium text-muted-foreground">Settings and Manage Members</div>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
