import { Sparkles } from "lucide-react"
import { Button } from "./ui/button"

export const UpgradeButton = () => {
    return (
        <Button
            variant="outline"
            size="default"
            className=" bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 text-white! border-none shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 px-4 py-2"
        >
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-xs">
                Upgrade ?
            </span>
        </Button>
    )
}