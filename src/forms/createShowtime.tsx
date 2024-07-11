import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ReactNode } from 'react'

export const schemaCreateShowtime = z.object({
  movieId: z.number(),
  screenId: z.number(),
  showtimes: z.array(z.object({ time: z.string() })),
})

export type FormTypeCreateShowtime = z.infer<typeof schemaCreateShowtime>

export const useFormCreateShowtime = () =>
  useForm<FormTypeCreateShowtime>({
    resolver: zodResolver(schemaCreateShowtime),
  })

export const FormProviderCreateShowtime = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateShowtime()

  return <FormProvider {...methods}>{children}</FormProvider>
}
