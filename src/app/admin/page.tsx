import { StatCard } from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'

async function getUser() {
  try {
    const data = await trpcServer.admins.dashboard.query();
    // Ensure data has the correct shape even if it's empty
    return data || { admin: 0, manager: 0, movie: 0, cinema: 0, user: 0 };
  } catch (err) {
    return { admin: 0, manager: 0, movie: 0, cinema: 0, user: 0 }; // Return default shape on error
  }
}


export default async function Page() {
  const dashboard = await getUser()
  return (
    <main className="flex flex-col gap-3">
      <StatCard href={'/admin/admins'} title={'Admins'}>
        {dashboard.admin}
      </StatCard>
      <StatCard href={'/admin/managers'} title={'Managers'}>
        {dashboard.manager}
      </StatCard>
      <StatCard href={'/admin/cinemas'} title={'Cinemas'}>
        {dashboard.cinema}
      </StatCard>
      <StatCard href={'/admin/movies'} title={'Movies'}>
        {dashboard.movie}
      </StatCard>
      <StatCard href={'/admin/users'} title={'Users'}>
        {dashboard.user}
      </StatCard>
    </main>
  )
}
