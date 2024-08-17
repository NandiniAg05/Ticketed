import { ReactNode } from 'react'
import { z } from 'zod'

export const schemaCreateAdmin = z.object({
  id: z.string().min(1, { message: 'Admin name is required' }),
})

export type FormTypeCreateAdmin = z.infer<typeof schemaCreateAdmin>


// export const useFormCreateAdmin = () =>
//   useForm<FormTypeCreateAdmin>({
//     resolver: zodResolver(schemaCreateAdmin),
//   })
// export const FormProviderCreateAdmin = ({
//   children,
// }: {
//   children: ReactNode
// }) => {
//   const methods = useFormCreateManager()

//   return <FormProvider {...methods}>{children}</FormProvider>
// }
