import { ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaCreateManager = z.object({
  id: z.string().min(1, { message: 'Manager name is required' }),
})

export type FormTypeCreateManager = z.infer<typeof schemaCreateManager>
