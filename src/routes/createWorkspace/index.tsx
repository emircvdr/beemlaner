import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, AudioWaveform, Command, GalleryVerticalEnd, Loader2, Network } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CreateAvatar } from '@/components/create-avatar'
import { GetUserSession } from '@/api/authApi'
import { createWorkspace } from '@/api/workspaceApi'
import Logo from '@/assets/AppLogo.svg'
import { createWorkspaceUser } from '@/api/workspaceUsers.api'

export const Route = createFileRoute('/createWorkspace/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('GalleryVerticalEnd')
  const [color, setColor] = useState('#8338ec')

  const [page, setPage] = useState(0)

  const [user, setUser] = useState<any>(null)

  const [workspaceId, setWorkspaceId] = useState('')


  useEffect(() => {
    GetUserSession().then((res) => {
      setUser(res.session?.user)
    })
  }, [])

  const handleSubmit = () => {
    setPage(2)
    createWorkspace({
      name: name,
      icon: icon,
      color: color,
      admin_id: user.id
    }).then((res) => {
      createWorkspaceUser(res[0].id, user.id, "Admin")
      setWorkspaceId(res[0].id)
    })
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      {
        page == 0 && (
          <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <img src={Logo} alt="Logo" className='w-10 h-10' />
              <p>
                Hellooo <span className='font-bold'>{user?.user_metadata.fullname}</span>
              </p>
              <p className='text-sm text-muted-foreground'>Are you ready to complete your tutorial?</p>
              <Button variant="ghost" onClick={() => setPage(1)}>
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        )
      }
      {
        page == 1 && (
          <Card className='w-full max-w-[600px] h-auto py-5 border-none shadow-lg'>
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
        )
      }
      {
        page == 2 && (
          <div className=''>
            <CreateAvatar user={user} setPage={setPage} workspaceId={workspaceId} />
            <Button variant="ghost" onClick={() => setPage(1)}>
              <ArrowLeft className='h-4 w-4' />
            </Button>

          </div>
        )
      }
      {
        page == 3 && (
          <div className='w-full h-screen flex flex-col items-center justify-center'>
            <img src={Logo} alt="Logo" className='w-10 h-10' />
            <div className=' rounded-lg p-4 flex flex-col items-center justify-center gap-2'>
              <p className='text-md text-muted-foreground'>
                Please wait while we setup your workspace
              </p>
              <div>
                <Loader2 className='h-10 w-10 animate-spin' />
              </div>
            </div>
            <Button variant="ghost" onClick={() => setPage(2)}></Button>

          </div>
        )
      }
    </div >
  )
}

