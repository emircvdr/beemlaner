import { WandSparkles } from "lucide-react"
import { Button } from "./ui/button"

export const UpgradeButton = () => {
    return (
        <Button
            variant="outline"
            size="default"
            className="text-black  rounded-2xl shadow-lg bg-gradient-to-r from-pink-200 via-blue-200 to-purple-300 border border-white/50 backdrop-blur-md"
        >
            <WandSparkles className="size-4 text-black" />
            <span className="text-xs">
                Upgrade
            </span>
        </Button>
    )
}