import { Genre } from '@prisma/client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaCreateMovie = z.object({
  title: z.string().min(1, { message: 'Movie Name is Required' }),
  genre: z.nativeEnum(Genre),
  director: z.string().min(1, { message: 'Director Name is Required' }),
  duration: z.number({ invalid_type_error: 'Duration is required' }),
  releaseDate: z.string(),
  posterUrl: z.any(),
})

export type FormTypeCreateMovie = z.infer<typeof schemaCreateMovie>

export const useFormCreateMovie = () =>
  useForm<FormTypeCreateMovie>({ resolver: zodResolver(schemaCreateMovie) })
