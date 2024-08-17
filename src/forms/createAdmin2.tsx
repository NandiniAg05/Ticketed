'use client'
import { useForm } from 'react-hook-form'
import { ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormTypeCreateAdmin } from './createAdmin'
import { schemaCreateAdmin } from './createAdmin'

export const useFormCreateAdmin = () =>
  useForm<FormTypeCreateAdmin>({
    resolver: zodResolver(schemaCreateAdmin),
  })
