import { GetUser } from '@/api/authApi'
import { getWorkspaces } from '@/api/workspaceApi'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'
import { useUserStore, useWorkspaceStore, } from '@/store/store'
import { Outlet, createFileRoute, } from '@tanstack/react-router'

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
        return {
            user: await GetUser(),
            workspace: await getWorkspaces()
        }
    }
})


function AppLayoutComponent() {

    const data = Route.useLoaderData()
    useUserStore.setState({ userId: data.user.user.id })
    useWorkspaceStore.setState({ workspaces: data.workspace as any })


    return (
        <div className="flex w-screen h-screen overflow-hidden bg-sidebar">
            <AppSidebar user={data.user.user.user_metadata as User} workspaces={data.workspace as any} />
            <SidebarInset>
                <SiteHeader />
                <div className='w-full h-full bg-background p-2'>
                    <Outlet />
                </div>

            </SidebarInset>
        </div>
    )
}