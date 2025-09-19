import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/entry/title')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/entry/title"!</div>
}
