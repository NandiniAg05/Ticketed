import { StatCard } from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const dashboard = await trpcServer.admins.dashboard.query()
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
