import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create/core')({
  component: () => <div>Hello /create/core!</div>
})