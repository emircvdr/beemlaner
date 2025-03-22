import { UpdatePassword } from '@/api/authApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
export const Route = createFileRoute('/(auth)/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const comparePasswords = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else {
      setConfirmPassword(e.target.value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    comparePasswords()
    await UpdatePassword({ password }).then(() => {
      toast.success('Password updated successfully')
      navigate({ to: '/login' })
    }).catch((error) => {
      toast.error(error.message)
    })
  }

  return (
    <div className='w-full  flex items-center justify-center'>
      <Card className="w-full max-w-[450px] h-auto py-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Please enter your new password</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <Input type="password" name='password' placeholder="New Password" value={password} onChange={handleChange} />
          <Input type="password" name='confirmPassword' placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} />
          {/* Add error messages */}
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
          {password && password.length < 6 && (
            <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
          )}
          <Button
            className='mt-4'
            disabled={
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              password.length < 6
            }
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
