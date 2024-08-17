import { StatCard } from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'

async function getUser() {
  try {
    const data = await trpcServer.managers.dashboard.query();
    // Ensure data has the correct shape even if it's empty
    return data || { cinema: 0, showtime: 0 };
  } catch (err) {
    return { cinema: 0, showtime: 0 }; // Return default shape on error
  }
}

export default async function Page() {
  const dashboard = await getUser()
  return (
    <main className="flex flex-col gap-3">
      <StatCard href={'/manager/cinemas'} title={'Cinemas'}>
        {dashboard.cinema}
      </StatCard>
      <StatCard href={'/manager/showtimes'} title={'ShowTimes'}>
        {dashboard.showtime}
      </StatCard>
    </main>
  )
}
