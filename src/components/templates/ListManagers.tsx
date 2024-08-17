import { trpcServer } from '@/trpc/clients/server'
import { UserCard } from '../organisms/UserCard'
import { Title2 } from '../ui/typography'

async function getUser() {
  try {
        const  data  = await trpcServer.managers.findAll.query()

        return data;
      }     catch (err) {
          return;
      }
}

export const ListManagers = async () => {
  const managers = await getUser()
  return (
    <div className="mt-6">
      <Title2>Managers</Title2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {managers?.map(({ User: { id, image, name } }) => (
          <UserCard key={id} user={{ id, image, name }} />
        ))}
      </div>
    </div>
  )
}
