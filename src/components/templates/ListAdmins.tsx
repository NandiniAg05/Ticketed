import { trpcServer } from '@/trpc/clients/server'
import { UserCard } from '../organisms/UserCard'
import { Title2 } from '../ui/typography'

async function getUser() {
  try {
        const data  = await trpcServer.admins.findAll.query()

        return data;
      }     catch (err) {
          return;
      }
}

export const ListAdmins = async () => {
  const admins = await getUser() 
  return (
    <div className="mt-6">
      <Title2>Admins</Title2>
      <div className="grid grid-col-1 gap-3 md:grid-cols-3">
        {admins?.map(({ User: { id, image, name } }) => (
          <UserCard key={id} user={{ id, image, name }} />
        ))}
      </div>
    </div>
  )
}
