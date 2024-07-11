'use client'
import { useFormCreateManager } from '@/forms/createManager'
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

export const CreateManager = ({ className }: ICreateAdminProps) => {
  const { register, handleSubmit, reset } = useFormCreateManager()
  const {
    mutateAsync: createManager,
    isLoading,
    error,
  } = trpcClient.managers.create.useMutation()
  const { toast } = useToast()
  useEffect(() => {
    if (error) {
      toast({ title: error.message })
    }
  }, [error])

  return (
    <div
      className={cn(
        'w-full p-4 bg-white rounded shadow-lg max-w-96',
        className,
      )}
    >
      <Title2>Create new manager</Title2>
      <form
        onSubmit={handleSubmit(async ({ id }) => {
          const manager = await createManager({ id })
          if (manager) {
            revalidatePath('/admin/managers')
            reset()
            toast({ title: 'Manager created.' })
          } else {
            toast({ title: 'Action failed.' })
          }
        })}
        className="space-y-2"
      >
        <Label title="UID">
          <Input placeholder="Enter the uid" {...register('id')} />
        </Label>
        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  )
}
