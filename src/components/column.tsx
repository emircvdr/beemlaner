
import { ColumnDef } from "@tanstack/react-table"
import { Crown, Flame, Gavel, MoreVerticalIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import BoringAvatar from "boring-avatars"
import { useUserStore } from "@/store/store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"


export type User = {
    user_id: string
    name: string
    fullname: string
    email: string
    role: string
    avatar_url: any
}


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "avatar_url",
        header: "",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    {
                        row.original.avatar_url ? (
                            <img src={row.original.avatar_url} alt="avatar" className="size-8! rounded-full" />
                        ) : (
                            <BoringAvatar name={row.original.user_id} variant="marble" colors={["#a8bcbd", "#fcdcb3", "#f88d87", "#d65981", "#823772"]} size={30} />
                        )
                    }
                </div>
            )
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <span>{row.original.name || row.original.fullname}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            return (
                <Badge
                    variant="outline"
                    className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
                >
                    {row.original.role === "Admin" ? (
                        <Crown className="text-yellow-500 dark:text-yellow-400" />
                    ) : (
                        <Flame className="text-red-500 dark:text-red-400" />
                    )}
                    <span className="text-black/80 dark:text-white/80">{row.original.role}</span>
                </Badge>

            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                        size="icon"
                    >
                        <MoreVerticalIcon />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    {
                        row.original.user_id === useUserStore((state) => state.userId) ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <DropdownMenuItem disabled={row.original.user_id ===
                                            useUserStore((state) => state.userId)
                                        } className="flex items-center gap-2">
                                            <Gavel size={10} />
                                            <span>Kick</span>
                                        </DropdownMenuItem>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        You can't kick yourself.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <DropdownMenuItem className="flex items-center gap-2">
                                <Gavel size={10} />
                                <span>Kick</span>
                            </DropdownMenuItem>
                        )
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]
