import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'
import { Outlet, createFileRoute, } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)')({
    component: AppLayoutComponent,

})

function AppLayoutComponent() {

    return (
        <div className="flex w-screen h-screen overflow-hidden bg-sidebar">
            <AppSidebar variant='inset' />
            <SidebarInset>
                <SiteHeader />
                <div className='w-full h-full bg-background p-2'>
                    <Outlet />
                </div>

            </SidebarInset>
        </div>
    )
}