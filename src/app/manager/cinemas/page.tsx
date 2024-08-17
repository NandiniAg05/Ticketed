import { trpcServer } from '@/trpc/clients/server'
import { CinemaInfo } from '@/components/templates/ListCinemas'

async function getUser() {
  try {
        const  data  = await trpcServer.cinemas.myCinemas.query()

        return data || [];
      }     catch (err) {
          return [];
      }
}

export default async function page() {
  const cinemas = await getUser()
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
