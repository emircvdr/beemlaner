
import { Chart } from '@/components/chart'
import InfoPage from '@/components/infoPage'
import { get_is_setup_profile_info_by_userID, getWorkspaceUserById } from '@/api/workspaceApi'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { FolderIcon, ListIcon, TrendingDownIcon, TrendingUpIcon, UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUserStore, useWorkspaceStore } from '@/store/store'

export const Route = createFileRoute('/(pages)/(home)/$id')({
    component: Index,
})

type Card = {
    title: string;
    detail: string;
    descriptionTitle: string;
    description: string;
    icon: React.ReactNode;
    badge: {
        icon: React.ReactNode;
        text: string;
        color: string;
    }
}


const cards: Record<string, Card> = {
    card1: {
        title: 'Projects',
        detail: '10',
        descriptionTitle: 'Total Projects',
        description: 'This is your total projects',
        icon: <FolderIcon className='size-4' />,
        badge: {
            icon: <TrendingUpIcon className="size-3" color='#03C988' />,
            text: "+12.5%",
            color: '#03C988'
        }
    },
    card2: {
        title: 'Tasks',
        detail: '120',
        descriptionTitle: 'Total Tasks',
        description: 'This is your total tasks',
        icon: <ListIcon className='size-4' />,
        badge: {
            icon: <TrendingUpIcon className="size-3" color='#03C988' />,
            text: "+0.5%",
            color: '#03C988'
        }

    },
    card3: {
        title: 'Users',
        detail: '3',
        descriptionTitle: 'Total Users',
        description: 'This is your total users for your workspace',
        icon: <UsersIcon className='size-4' />,
        badge: {
            icon: <TrendingDownIcon className="size-3" color='#ED2B2A' />,
            text: "+0.5%",
            color: '#03C988'
        }
    }
}

function Index() {
    const userId = useUserStore(state => state.userId)
    const workspace = useWorkspaceStore(state => state.workspaces)
    const [isSetupProfile, setIsSetupProfile] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        get_is_setup_profile_info_by_userID(userId as any).then((res) => {
            setIsSetupProfile(res)
        })
    }, [])

    if (isSetupProfile === undefined) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return (
        <div>
            {isSetupProfile ? (
                <div className="w-full h-full">
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {Object.entries(cards).map(([key, card]) => (
                            <Card className="@container/card bg-background" key={key}>
                                <CardHeader className="relative">
                                    <CardDescription>{card.title}</CardDescription>
                                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                        {card.detail}
                                    </CardTitle>
                                    {card.badge && (
                                        <div className="absolute right-4 top-4">
                                            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                                {card.badge.icon}
                                                {card.badge.text}
                                            </Badge>
                                        </div>
                                    )}
                                </CardHeader>
                                <CardFooter className="flex-col items-start gap-1 text-sm">
                                    <div className="line-clamp-1 flex items-center gap-3 font-medium">
                                        {card.descriptionTitle} {card.icon}
                                    </div>
                                    <div className="text-muted-foreground">
                                        {card.description}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <Chart />
                </div>
            ) : <InfoPage />}
        </div>
    )
}
