import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(pages)/profile/"!</div>
}
