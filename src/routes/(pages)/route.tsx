import { GetUser } from '@/api/authApi'
import { getWorkspaceUserById, sync_user_profiles } from '@/api/workspaceApi'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { SidebarInset } from '@/components/ui/sidebar'
import { useUserDataStore, useUserStore, useWorkspaceStore } from "@/store/store"
import { Outlet, createFileRoute, useNavigate, } from '@tanstack/react-router'
import { PartyPopper } from 'lucide-react'
import { useState } from 'react'
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
            workspace: workspaceData,

        }
    }
})

function AppLayoutComponent() {
    const navigate = useNavigate()
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


    const [isSetupProfile, setIsSetupProfile] = useState(true)

    return (
        <div className="flex w-screen h-screen overflow-hidden bg-sidebar">
            <AppSidebar
                user={data.user.user.user_metadata as User}
                workspaces={data.workspace as any}
            />
            <SidebarInset>
                <SiteHeader />
                <div className='w-full h-full bg-background p-2'>
                    <div>
                        {isSetupProfile ? (
                            <Outlet />
                        ) : (
                            <div className='w-full h-full bg-background p-6 mt-2 flex flex-col items-center justify-center'>
                                <PartyPopper className='size-10 mb-4' />
                                <p className='text-xl  mb-12 text-center'>Before you start, let's setup your profile and create your first workspace</p>

                                <div className='w-full max-w-3xl flex flex-col gap-8'>
                                    <div className='w-full flex items-start gap-6 p-4 rounded-lg border bg-card'>
                                        <div className='relative flex-shrink-0'>
                                            <div className='w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold'>1</div>
                                            <div className='absolute top-full left-1/2 w-0.5 h-16 bg-border -translate-x-1/2' />
                                        </div>
                                        <div className='flex flex-col gap-2 w-full'>
                                            <h3 className='text-lg font-medium'>Setup Profile</h3>
                                            <p className='text-muted-foreground'>Complete your profile information to get started</p>
                                            <Button size="lg" className='mt-4 w-full sm:w-auto' onClick={() => navigate({ to: '/setupProfile', })}>
                                                Let's Complete Profile
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='w-full flex items-start gap-6 p-4 rounded-lg border bg-card/50'>
                                        <div className='flex-shrink-0'>
                                            <div className='w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-lg font-semibold'>2</div>
                                        </div>
                                        <div className='flex flex-col gap-2 w-full'>
                                            <h3 className='text-lg font-medium text-muted-foreground'>Create Workspace</h3>
                                            <p className='text-muted-foreground'>Set up your first workspace and start collaborating</p>
                                            <Button size="lg" variant="outline" className='mt-4 w-full sm:w-auto' disabled>
                                                Create Workspace
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </div>
    )
}