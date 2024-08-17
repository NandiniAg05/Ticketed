import { ListCinemas } from '@/components/templates/ListCinemas'
import { trpcServer } from '@/trpc/clients/server'

async function getUser() {
  try {
    const data = await trpcServer.cinemas.cinemas.query()

    return data || []
  } catch (err) {
    return []
  }
}

export default async function page() {
  const cinemas = await getUser()
  return (
    <main>
      <ListCinemas cinemas={cinemas} />
    </main>
  )
}
