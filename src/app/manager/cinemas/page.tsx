import { trpcServer } from '@/trpc/clients/server'
import { CinemaInfo } from '@/components/templates/ListCinemas'

export default async function page() {
  const cinemas = await trpcServer.cinemas.myCinemas.query()
  return (
    <main>
      <div>
        <div>
          {cinemas.length === 0 ? (
            <div>You have not created any cinemas yet.</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          {cinemas.map((cinema) => (
            <CinemaInfo key={cinema.id} cinema={cinema} />
          ))}
        </div>
      </div>
    </main>
  )
}
