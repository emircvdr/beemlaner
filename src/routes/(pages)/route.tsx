import { GetUser } from '@/api/authApi'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'
import { useUserStore } from '@/store/store'
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
            user: await GetUser()
        }
    }
})


function AppLayoutComponent() {

    const user = Route.useLoaderData()
    useUserStore.setState({ userId: user.user.user.id })


    return (
        <div className="flex w-screen h-screen overflow-hidden bg-sidebar">
            <AppSidebar user={user.user.user.user_metadata as User} />
            <SidebarInset>
                <SiteHeader />
                <div className='w-full h-full bg-background p-2'>
                    <Outlet />
                </div>

            </SidebarInset>
        </div>
    )
}