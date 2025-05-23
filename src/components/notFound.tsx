import { useEffect, useState } from "react"
import NotFoundImage from "../assets/notFoundImage.png"
import { useNavigate } from "@tanstack/react-router"
import { Route } from "@/routes/__root"

export default function NotFound() {
    const navigate = useNavigate()
    const [time, setTime] = useState(3)
    const { id } = Route.useParams() as { id: string }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1)
        }, 1000)

        const timeout = setTimeout(() => {
            navigate({ to: '/$id', params: { id: id } })
        }, 3000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [navigate])

    return (
        <div className="w-full flex items-center justify-center flex-col gap-4">
            <h1 className="text-4xl font-bold">OOPSSS!</h1>
            <img src={NotFoundImage} alt="Not Found" />
            <div className="flex items-center gap-2 flex-col mt-2">
                <p className="text-sm text-gray-500">It might have been moved or deleted.</p>
                <p className="text-sm text-gray-500">Redirecting to the homepage in {time} seconds</p>
            </div>
        </div>
    )
}