'use client'
import { ProjectionType, SoundSystemType } from '@prisma/client'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormTypeCreateCinema } from './createCinema'
import { schemaCreateCinema } from './createCinema'

export const useFormCreateCinema = () =>
  useForm<FormTypeCreateCinema>({
    resolver: zodResolver(schemaCreateCinema),
    defaultValues: {
      address: { address: '', lat: 0, lng: 0 },
      cinemaName: '',
      screens: [],
    },
  })

export const FormProviderCreateCinema = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateCinema()

  return <FormProvider {...methods}>{children}</FormProvider>
}
