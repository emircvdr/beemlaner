
import { Chart } from '@/components/chart'
import { createWorkspace, get_is_setup_profile_info_by_userID } from '@/api/workspaceApi'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AudioWaveform, Command, FolderIcon, GalleryVerticalEnd, ListIcon, Network, TrendingDownIcon, TrendingUpIcon, UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUserStore, useWorkspaceStore } from '@/store/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createWorkspaceUser } from '@/api/workspaceUsers.api'

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
    const navigate = useNavigate()
    const userId = useUserStore(state => state.userId)
    const workspace = useWorkspaceStore(state => state.workspaces)
    const [isSetupProfile, setIsSetupProfile] = useState<boolean | undefined>(undefined)
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('GalleryVerticalEnd')
    const [color, setColor] = useState('#8338ec')

    const handleSubmit = () => {
        createWorkspace({
            name: name,
            icon: icon,
            color: color,
            admin_id: userId as any
        }).then((res) => {
            createWorkspaceUser(res[0].id, userId as any, "Admin")
            navigate({ to: '/$id', params: { id: res[0].id } }).then(() => {
                window.location.reload()
            })

        })

    }

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
            <div className="w-full h-full">
                {
                    workspace?.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <div className='w-full h-screen flex items-center justify-center'>
                            <Card className='w-full max-w-[600px] h-auto py-5 border-none  bg-transparent'>
                                <CardHeader>
                                    <CardTitle>Create Workspace</CardTitle>
                                    <CardDescription>
                                        Create a new workspace to get started. Click save when you're done.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-row gap-4">
                                        <div className="flex flex-col gap-2">
                                            <div
                                                className={`w-30 h-30 border rounded-lg flex items-center justify-center`}
                                                style={{ backgroundColor: color }}
                                            >
                                                {icon === 'GalleryVerticalEnd' && <GalleryVerticalEnd className="h-8 w-8 text-white" />}
                                                {icon === 'AudioWaveform' && <AudioWaveform className="h-8 w-8 text-white" />}
                                                {icon === 'Command' && <Command className="h-8 w-8 text-white" />}
                                                {icon === 'Network' && <Network className="h-8 w-8 text-white" />}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 flex-1">
                                            <Input
                                                type="text"
                                                placeholder="Workspace name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm text-muted-foreground">Icon</p>
                                                <div className="flex flex-row gap-1">
                                                    <Button variant="outline" size="icon" onClick={() => setIcon("GalleryVerticalEnd")}>
                                                        <GalleryVerticalEnd className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" onClick={() => setIcon("AudioWaveform")}>
                                                        <AudioWaveform className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" onClick={() => setIcon("Command")}>
                                                        <Command className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" onClick={() => setIcon("Network")}>
                                                        <Network className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm text-muted-foreground">Color</p>
                                                <div className="flex flex-row gap-1">
                                                    <Button variant="outline" size="sm" className="bg-[#8338ec]! h-6 w-6" onClick={() => setColor("#8338ec")} />
                                                    <Button variant="outline" size="sm" className="bg-[#3b82f6]! h-6 w-6" onClick={() => setColor("#3b82f6")} />
                                                    <Button variant="outline" size="sm" className="bg-[#10b981]! h-6 w-6" onClick={() => setColor("#10b981")} />
                                                    <Button variant="outline" size="sm" className="bg-[#f59e0b]! h-6 w-6" onClick={() => setColor("#f59e0b")} />
                                                    <Button variant="outline" size="sm" className="bg-[#f43f5e]! h-6 w-6" onClick={() => setColor("#f43f5e")} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className='w-full' onClick={handleSubmit}>Create Workspace</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
