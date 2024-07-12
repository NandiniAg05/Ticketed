'use client'
import { FormTypeCreateMovie } from './createMovie'
import { schemaCreateMovie } from './createMovie'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFormCreateMovie = () =>
    useForm<FormTypeCreateMovie>({ resolver: zodResolver(schemaCreateMovie) })