'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormTypeCreateManager } from './createManager'
import { schemaCreateManager } from './createManager'

export const useFormCreateManager = () =>
    useForm<FormTypeCreateManager>({
      resolver: zodResolver(schemaCreateManager),
    })
  
  export const FormProviderCreateManager = ({
    children,
  }: {
    children: ReactNode
  }) => {
    const methods = useFormCreateManager()
  
    return <FormProvider {...methods}>{children}</FormProvider>
  }