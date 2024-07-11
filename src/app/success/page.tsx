import { trpcServer } from '@/trpc/clients/server'
import { redirect } from 'next/navigation'

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const sessionId = searchParams?.session_id as string

  if (!sessionId) {
    return <div>Session id missing.</div>
  }

  const ticket = await trpcServer.stripe.checkout.mutate({ sessionId })
  console.log('Created ticket ID:', ticket.id)

  if (ticket.id) {
    redirect('/user/tickets')
  } else {
    return <div>Failed to create ticket</div>
  }
}
