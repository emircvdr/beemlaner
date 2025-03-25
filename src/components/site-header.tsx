import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ToggleThemeButton } from "./toggle-theme-button"
import { Inbox } from "lucide-react"

export function SiteHeader() {

    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-base font-medium">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Inbox className="size-4 cursor-pointer" />
                            <span className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">3</span>
                        </div>
                        <ToggleThemeButton />
                    </div>
                </div>

            </div>
        </header>
    )
}
