import { CreateManager } from '@/components/templates/CreateManager'
import { trpcServer } from '@/trpc/clients/server'
import { ListManagers } from '@/components/templates/ListManagers'

export default async function Page() {
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div>Manage Managers</div>
      </div>
      <CreateManager />
      <ListManagers />
    </div>
  )
}
