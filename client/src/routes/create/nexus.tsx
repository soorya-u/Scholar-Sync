import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create/nexus')({
  component: () => <div>Hello /create/nexus!</div>
})