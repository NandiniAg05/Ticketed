import { CreateAdmin } from '@/components/templates/CreateAdmin'
import { ListAdmins } from '@/components/templates/ListAdmins'

export default async function ManageAdmins() {
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div>Manage Admins</div>
      </div>
      <CreateAdmin />
      <ListAdmins />
    </div>
  )
}
