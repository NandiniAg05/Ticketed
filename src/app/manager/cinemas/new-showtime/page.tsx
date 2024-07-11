'use client'
import { CreateShowtimes } from '@/components/templates/CreateShowtimes'
import { FormProviderCreateShowtime } from '@/forms/createShowtime'

export default function Page() {
  return (
    <FormProviderCreateShowtime>
      <CreateShowtimes />
    </FormProviderCreateShowtime>
  )
}
