import { ListCinemas } from '@/components/templates/ListCinemas'
import { trpcServer } from '@/trpc/clients/server'

export default async function page() {
  const cinemas = await trpcServer.cinemas.cinemas.query()
  return (
    <main>
      <ListCinemas cinemas={cinemas} />
    </main>
  )
}
