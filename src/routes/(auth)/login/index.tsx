import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login/')({
    component: Login,
})

function Login() {
    return <div>Hello "/(auth)/login/"!</div>
}
