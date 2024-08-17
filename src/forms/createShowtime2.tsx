'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { FormTypeCreateShowtime } from './createShowtime'
import { schemaCreateShowtime } from './createShowtime'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ReactNode } from 'react'

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
