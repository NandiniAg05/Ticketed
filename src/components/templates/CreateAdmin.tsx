'use client'
import { useFormCreateAdmin } from '@/forms/createAdmin2'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { Title2 } from '../ui/typography'
import { cn } from '@/utils/styles'
import { BaseComponent } from '@/utils/types'
import { trpcClient } from '@/trpc/clients/client'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { useToast } from '../molecules/toaster/use-toast'
import { Button } from '../ui/button'
import { useEffect } from 'react'

export interface ICreateAdminProps extends BaseComponent {}

export const CreateAdmin = ({ className }: ICreateAdminProps) => {
  const { register, handleSubmit, reset } = useFormCreateAdmin()
  const { mutateAsync, error } = trpcClient.admins.create.useMutation()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({ title: error.message })
    }
  }, [toast, error])

  return (
    <div
      className={cn(
        'w-full p-4 bg-white rounded shadow-lg max-w-96',
        className,
      )}
    >
      <Title2>Create new admin</Title2>
      <form
        onSubmit={handleSubmit(async ({ id }) => {
          const admins = await mutateAsync({ id })
          if (admins) {
            revalidatePath('/admin/adminss')
            reset()
            toast({ title: 'Admin created.' })
          } else {
            toast({ title: 'Action failed.' })
          }
        })}
        className="space-y-2"
      >
        <Label title="UID">
          <Input placeholder="Enter the uid" {...register('id')} />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
