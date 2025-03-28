import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { PartyPopper } from 'lucide-react'



export default function InfoPage() {
  const navigate = useNavigate()

  return <div className='w-full h-full bg-background p-6 mt-2 flex flex-col items-center justify-center'>
    < PartyPopper className='size-10 mb-4' />
    <p className='text-xl  mb-12 text-center'>Before you start, let's setup your profile and create your first workspace</p>

    <div className='w-full max-w-3xl flex flex-col gap-8'>
      <div className='w-full flex items-start gap-6 p-4 rounded-lg border bg-card'>
        <div className='relative flex-shrink-0'>
          <div className='w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold'>1</div>
          <div className='absolute top-full left-1/2 w-0.5 h-16 bg-border -translate-x-1/2' />
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <h3 className='text-lg font-medium'>Setup Profile</h3>
          <p className='text-muted-foreground'>Complete your profile information to get started</p>
          <Button size="lg" className='mt-4 w-full sm:w-auto' onClick={() => navigate({ to: '/setupProfile', })}>
            Let's Complete Profile
          </Button>
        </div>
      </div>
      <div className='w-full flex items-start gap-6 p-4 rounded-lg border bg-card/50'>
        <div className='flex-shrink-0'>
          <div className='w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-lg font-semibold'>2</div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <h3 className='text-lg font-medium text-muted-foreground'>Create Workspace</h3>
          <p className='text-muted-foreground'>Set up your first workspace and start collaborating</p>
          <Button size="lg" variant="outline" className='mt-4 w-full sm:w-auto' disabled>
            Create Workspace
          </Button>
        </div>
      </div>
    </div>
  </div >
}
