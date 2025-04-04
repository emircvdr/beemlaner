import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    WandSparkles,
} from "lucide-react"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Logout } from "@/api/authApi"
import { useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import { notionists } from "@dicebear/collection"


interface User {
    fullname: string
    email: string
    sub: string
    full_name: string
    avatar_url?: string
}

interface UserAvatarOptions {
    body: string[]
    eyes: string[]
    hair: string[]
    lips: string[]
    nose: string[]
    beard: string[]
    brows: string[]
    glasses: string[]
    bodyIcon: string[]
}

export function NavUser({ user, userAvatarOptions }: { user: User; userAvatarOptions: UserAvatarOptions }) {
    const { isMobile } = useSidebar()

    const avatar = useMemo(() => {
        return createAvatar(notionists, {
            seed: "Aneka",
            backgroundColor: ["f8f9fa"],
            backgroundType: ["solid"],
            body: [userAvatarOptions?.body[0] as any],
            eyes: [userAvatarOptions?.eyes[0] as any],
            hair: [userAvatarOptions?.hair[0] as any],
            lips: [userAvatarOptions?.lips[0] as any],
            nose: [userAvatarOptions?.nose[0] as any],
            beard: [userAvatarOptions?.beard[0] as any],
            brows: [userAvatarOptions?.brows[0] as any],
            radius: 5,
            glasses: [userAvatarOptions?.glasses[0] as any],
            bodyIcon: [userAvatarOptions?.bodyIcon[0] as any],
            beardProbability: 100,
            glassesProbability: 20,
            bodyIconProbability: 75,
        }).toDataUri()
    }, [])

    const navigate = useNavigate()
    const handleLogout = () => {
        Logout()
        navigate({ to: '/login' })
    }

    return (
        <div>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                {
                                    user.avatar_url ? (
                                        <img src={user.avatar_url} alt="avatar" className="size-8! rounded-lg" />
                                    ) : (
                                        <img src={avatar} alt="avatar" className="size-11! rounded-lg" />
                                    )
                                }
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate ">{user?.fullname || user?.full_name}</span>
                                    <span className="truncate text-[10px]">{user?.email || ''}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    {
                                        user?.avatar_url ? (
                                            <img src={user?.avatar_url} alt="avatar" className="size-8! rounded-full" />
                                        ) : (
                                            <img src={avatar} alt="avatar" className="size-11! rounded-lg" />
                                        )
                                    }
                                    {/* <img src={avatar} alt="avatar" className="size-10! rounded-lg" /> */}
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate ">{user?.fullname || user?.full_name}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="text-black cursor-pointer  rounded-2xl shadow-lg bg-gradient-to-r from-pink-200 via-blue-200 to-purple-300 border border-white/50 backdrop-blur-md"
                                >
                                    <WandSparkles className="size-4 text-black" />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>

    )
}
