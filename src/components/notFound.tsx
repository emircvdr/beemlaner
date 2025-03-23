import NotFoundImage from "../assets/notFoundImage.png"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "./ui/button"
export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="w-full  flex items-center justify-center flex-col gap-4">
            <h1 className="text-4xl font-bold">OOPSSS!</h1>
            <img src={NotFoundImage} alt="Not Found" />
            <div className="flex items-center gap-2 flex-col mt-2">
                <p className="text-sm text-gray-500">It might have been moved or deleted.</p>
                <Button variant="outline" onClick={() => navigate({ to: '/' })}>Go back to the homepage</Button>
            </div>
        </div>
    )
}