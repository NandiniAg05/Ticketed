'use client'
import { CreateCinema } from '@/components/templates/CreateCinema'
import { FormProviderCreateCinema } from '@/forms/createCinema2'

export default function Page() {
  return (
    <FormProviderCreateCinema>
      <CreateCinema />
    </FormProviderCreateCinema>
  )
}
