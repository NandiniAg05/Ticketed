import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ReactNode } from 'react'

export const schemaCreateShowtime = z.object({
  movieId: z.number(),
  screenId: z.number(),
  showtimes: z.array(z.object({ time: z.string() })),
})

export type FormTypeCreateShowtime = z.infer<typeof schemaCreateShowtime>
