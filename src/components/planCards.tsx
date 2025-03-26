import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
const cardDetails = [
    {
        title: "Individuals",
        price: "$0",
        featuresTitle: "Free, forever",
        features: ["10 User", "10 Projects", "Support", "Unlimited Tasks", "Unlimited Projects", "Unlimited Customization"],
        buttonText: "Get Started",
    },
    {
        title: "Teams",
        price: "$15",
        featuresTitle: "Free plan features, plus:",
        features: ["1 Team", "Unlimited Customization", "100 User", "Unlimited Projects", "AI Integration", "Priority Support"],
    }
]

export const IndividualCard = () => {
    return (
        <Card className="w-1/3 h-full bg-transparent">
            <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between">
                    <span className="text-lg">{cardDetails[0].title}</span>
                    <Badge variant="outline" className="ml-2">
                        <div className="w-2 h-2 bg-green-500/80 dark:bg-green-500/80 rounded-full"></div>   Active Plan
                    </Badge>
                </CardTitle>
                <CardDescription>
                    <span className=""><span className="text-4xl">{cardDetails[0].price}</span> per month/user.</span>
                    <p className="mt-2">
                        Good for individuals. Track your tasks and projects.
                    </p>
                </CardDescription>
            </CardHeader>
            <div className="flex flex-row justify-center items-center p-3">
                <Button variant="default" size="sm" className="w-full">
                    Get Started
                </Button>
            </div>

            <Separator />
            <CardContent>
                <p className="text-[16px] mb-2">{cardDetails[0].featuresTitle}</p>
                <ul>
                    {cardDetails[0].features.map((feature) => (
                        <li key={feature} className="flex flex-row gap-5 items-center">
                            <Check className='w-4 h-4 text-green-500/80 dark:text-green-500/80' />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export const TeamsCard = () => {
    return (
        <Card className="w-1/3 h-full">
            <CardHeader>
                <CardTitle className="text-lg flex flex-row items-center justify-between">
                    <span className="text-lg">{cardDetails[1].title}</span>

                    <Badge variant="outline" className="ml-2">
                        <div className="w-2 h-2 bg-blue-500/80 dark:bg-blue-500/80 rounded-full"></div>  Best Seller
                    </Badge>

                </CardTitle>
                <CardDescription>
                    <span className=""><span className="text-4xl">{cardDetails[1].price}</span> per month/user.</span>
                    <p className="mt-2">
                        AI Integration and Priority Support included.
                    </p>
                </CardDescription>
            </CardHeader>
            <div className="flex flex-row justify-center items-center p-3">
                <Button variant="default" size="sm" className="w-full">
                    Get Started
                </Button>
            </div>

            <Separator />
            <CardContent>
                <p className="text-[16px] mb-2">{cardDetails[1].featuresTitle}</p>
                <ul>
                    {cardDetails[1].features.map((feature) => (
                        <li key={feature} className="flex flex-row gap-5 items-center">
                            <Check className='w-4 h-4 text-green-500/80 dark:text-green-500/80' />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}