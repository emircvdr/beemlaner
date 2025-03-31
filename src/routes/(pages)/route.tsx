import { GetUser } from '@/api/authApi'
import { getUserProfile } from '@/api/userApi'
import { getWorkspaceUserById, sync_user_profiles } from '@/api/workspaceApi'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'
import { useUserAllDataStore, useUserStore, useWorkspaceStore } from "@/store/store"
import { Outlet, createFileRoute, redirect, useNavigate, useParams } from '@tanstack/react-router'
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
        const userProfilesData = await getUserProfile(userData.user.id)
        return {
            user: userData,
            workspace: workspaceData,
            userAllData: userData,
            userProfilesData: userProfilesData[0],
        }
    }
})

function AppLayoutComponent() {
    const data = Route.useLoaderData()
    const { id } = Route.useParams() as { id: string }
    const navigate = useNavigate()
    const setUserId = useUserStore(state => state.setUserId)
    const setWorkspaces = useWorkspaceStore(state => state.setWorkspaces)
    const setUserAlldata = useUserAllDataStore(state => state.setUserAlldata)
    const firstWorkspace = data.workspace.find((x: any) => x.admin_id === data.user.user.id)?.workplace_uuid

    if (data.user?.user?.id) {
        setUserId(data.user.user.id)
        setWorkspaces(data.workspace)
        setUserAlldata(data.userAllData.user as any)
    }

    if (data.user.user.confirmed_at != null && data.user.user.app_metadata.provider != 'email') {
        sync_user_profiles()
    }

    useEffect(() => {
        if (firstWorkspace && (location.pathname == '/undefined' || location.pathname == '')) {
            navigate({
                to: '/$id',
                params: { id: firstWorkspace }
            }).then(() => {
                window.location.reload()
            })
        }
    }, [])


    return (
        <div className="flex w-screen h-screen overflow-hidden bg-sidebar">
            {
                data.userProfilesData?.avatar_options || data.userProfilesData?.avatar_url ? (
                    <AppSidebar
                        user={data.user.user.user_metadata as User}
                        workspaces={data.workspace as any}
                        userAvatarOptions={data.userProfilesData?.avatar_options}
                        firstWorkspace={firstWorkspace}
                        currentWorkspace={id}
                    />
                ) : null
            }
            <SidebarInset>
                {
                    data.userProfilesData?.avatar_options || data.userProfilesData?.avatar_url ? (
                        <SiteHeader />
                    ) : null
                }
                <div className='w-full h-full bg-background p-2'>
                    <Outlet />
                </div>
            </SidebarInset >
        </div >
    )
}