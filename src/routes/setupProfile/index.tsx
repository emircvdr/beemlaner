import { CreateAvatar } from '@/components/create-avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserAllDataStore } from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Pencil } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/setupProfile/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [username, setUsername] = useState('')
    const [nextStep, setNextStep] = useState(false)
    const [backStep, setBackStep] = useState(true)

    const handleNextStep = () => {
        setNextStep(true)
        setBackStep(false)
    }

    const handleBackStep = () => {
        setBackStep(true)
        setNextStep(false)
    }

    const userAllData = useUserAllDataStore(state => state.userAllData)


    return (
        <div className='w-screen h-screen flex flex-col gap-4 items-center justify-center'>
            {
                nextStep ? (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <p className='text-2xl font-bold'>What's your avatar?</p>
                        <CreateAvatar username={username as any} userAllData={userAllData as any} />
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <Pencil size={35} className='text-primary' />
                        <p className='text-2xl font-bold'>Time to create a profile!</p>
                        <p className='text-sm text-muted-foreground'>Let's get to know you.</p>
                        <div className='flex flex-col items-center justify-center gap-4 w-full'>
                            <Input placeholder='Username' className='w-full' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                )
            }

            <div className='flex items-center justify-center gap-4  mt-5'>

                {
                    nextStep ? (
                        null
                    ) : (
                        <Button disabled={!username} variant='ghost' size='icon' onClick={handleNextStep}>
                            <ArrowRight className='text-black dark:text-white w-6! h-6!' />
                        </Button>
                    )
                }
                {
                    backStep ? (
                        null
                    ) : (
                        <Button variant='ghost' size='icon' onClick={handleBackStep}>
                            <ArrowLeft className='text-black dark:text-white w-6! h-6!' />
                        </Button>
                    )
                }
            </div>

        </div >
    )
}
