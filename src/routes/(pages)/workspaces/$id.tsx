import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useWorkspaceStore } from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import * as LucideIcons from "lucide-react"
import { Button } from '@/components/ui/button'
import DataTable from '../../../components/data-table'
import { columns } from '../../../components/column'
import React, { useEffect, useState } from 'react'
import { getWorkspaceUsers } from '@/api/workspaceUsers.api'
import { updateWorkspace } from '@/api/workspaceApi'
import { toast } from 'sonner'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DeleteDialog } from '@/components/deleteDialog'
import { IndividualCard, TeamsCard } from '@/components/planCards'

export const Route = createFileRoute('/(pages)/workspaces/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const currentWorkspace = useWorkspaceStore((state) => state.workspaces)
  const currentWorkspaceId = Route.useParams().id
  const workspace = currentWorkspace?.find((workspace: any) => workspace.id == currentWorkspaceId)

  const [disabled, setDisabled] = useState(true)

  const [name, setName] = useState<any>(workspace?.name || '')
  const [members, setMembers] = useState<any>([])
  const getIconComponent = (iconName: string) => {
    return LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.FileIcon
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setDisabled(false)
  }

  const handleUpdateWorkspace = () => {
    updateWorkspace({
      id: currentWorkspaceId,
      name: name
    }).then((res) => {
      if (res) {
        toast.success('Workspace updated successfully')
      }
    }).catch((err) => {
      console.log(err)
    })
  }



  useEffect(() => {
    getWorkspaceUsers(currentWorkspaceId).then((res) => {
      setMembers(res)
    })
  }, [])

  const membersCount = members.length

  return (
    <div className='w-full h-full overflow-y-auto! flex items-center justify-start flex-col gap-5'>
      <Card className='min-w-1/2 items-start h-fit border-none shadow-none bg-transparent'>
        <CardHeader>
          <CardTitle className='text-xl'>Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-row gap-5'>
            <div className='w-30 h-30 rounded-lg flex items-center justify-center ' style={{ backgroundColor: workspace?.color }}>
              {React.createElement(getIconComponent(workspace?.icon) as React.ElementType, { className: 'size-15 text-white ' })}
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-black/80 dark:text-white/80 text-sm'>Workspace Name</p>
              <div className='flex flex-row gap-2'>
                <Input placeholder='Workspace Name' className={`${disabled ? 'bg-gray-100 cursor-not-allowed  dark:bg-gray-800' : 'bg-white  dark:bg-gray-900'}`} value={name} disabled={disabled} onChange={(e) => { handleNameChange(e) }} /> {
                  !disabled && (
                    <Button variant='ghost' size="icon" className='w-fit' onClick={() => { handleUpdateWorkspace() }}>
                      <LucideIcons.Check className='w-8! h-4 text-green-500' />
                    </Button>
                  )

                }
              </div>
              <p className='text-black/80 dark:text-white/80 text-sm'>Want to change your workspace name? <span className='text-black/80 dark:text-white/80 cursor-pointer underline' onClick={() => setDisabled(false)}>Click here</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='flex flex-col gap-2 w-1/2 p-6'>
        <p className='text-xl font-semibold'>Members</p>
        <DataTable columns={columns} data={members} />
      </div>
      <Accordion type="multiple" className='flex flex-col gap-2 w-1/2 p-6'>
        <AccordionItem value="item-1">
          <AccordionTrigger className='text-blue-500/80 dark:text-blue-500/80 text-sm'>Plan</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            <div className=' flex flex-row gap-5  justify-center'>
              <IndividualCard />
              <TeamsCard />
            </div>

          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className='text-red-500/80 dark:text-red-500/80 text-sm'>Danger Zone</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            <div className='flex flex-row items-center justify-between border border-red-500/30 rounded-lg p-2'>
              <p className='text-red-500/80 dark:text-red-500/80 text-sm'>Delete Workspace</p>
              <DeleteDialog workspaceName={name} workspaceId={currentWorkspaceId} count={membersCount} />
            </div>
            <div className='flex flex-row items-center justify-between border border-amber-500/30 rounded-lg p-2'>
              <p className='text-amber-500/80 dark:text-amber-500/80 text-sm'>Change Visibility</p>
              <Button size="default" variant="secondary" className='bg-amber-300/40' >
                Change Visibility
                <LucideIcons.Eye size={10} />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
