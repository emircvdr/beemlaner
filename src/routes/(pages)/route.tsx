import { GetUser } from '@/api/authApi'
import { getWorkspaceUserById, sync_user_profiles } from '@/api/workspaceApi'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'
import { useUserStore, useWorkspaceStore } from "@/store/store"
import { Outlet, createFileRoute, } from '@tanstack/react-router'
import { useEffect } from 'react'

interface User {
    fullname: string
    email: string
    sub: string
    full_name: string
    avatar_url?: string
}

export const Route = createFileRoute('/(pages)')({
    component: AppLayoutComponent,
    loader: async () => {
        const userData = await GetUser()
        const workspaceData = await getWorkspaceUserById(userData.user.id)

        return {
            user: userData,
            workspace: workspaceData
        }
    }
})

function AppLayoutComponent() {
    const data = Route.useLoaderData()
    const setUserId = useUserStore(state => state.setUserId)
    const setWorkspaces = useWorkspaceStore(state => state.setWorkspaces)

    if (data.user?.user?.id) {
        setUserId(data.user.user.id)
        setWorkspaces(data.workspace)
    }

    if (data.user.user.confirmed_at != null) {
        sync_user_profiles()
    }




    return (
        <div className="flex w-screen h-screen overflow-hidden bg-sidebar">
            <AppSidebar
                user={data.user.user.user_metadata as User}
                workspaces={data.workspace as any}
            />
            <SidebarInset>
                <SiteHeader />
                <div className='w-full h-full bg-background p-2'>
                    <Outlet />
                </div>
            </SidebarInset>
        </div>
    )
}