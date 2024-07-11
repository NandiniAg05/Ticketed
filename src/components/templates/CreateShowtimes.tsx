'use client'
import { FormTypeCreateShowtime } from '@/forms/createShowtime'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/toaster/use-toast'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { useEffect } from 'react'

export interface ICreateShowtimeProps {}

export const CreateShowtimes = ({}: ICreateShowtimeProps) => {
  const {
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormTypeCreateShowtime>()

  const {
    isLoading,
    data,
    error,
    mutateAsync: createShowtime,
  } = trpcClient.showtimes.create.useMutation()

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      reset()
      toast({ title: 'Showtimes Created' })
      revalidatePath('/manager/cinemas')
      router.replace('/manager/cinemas')
    }
  }, [data, reset, router, toast])

  useEffect(() => {
    if (error) {
      toast({ title: `Failed.` })
      console.log('Error', error)
    }
  }, [error, toast])

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log('form submitted: ', data)
          await createShowtime(data)
        })}
      >
        <SelectMovie />
        <SelectScreen />
        <AddShows />
        <Button loading={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export const AddShows = () => {
  const { control, register } = useFormContext<FormTypeCreateShowtime>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'showtimes',
  })

  return (
    <div>
      <Label title="Shows">
        <div className="grid grid-cols-3 gap-2">
          {fields.map((item, index) => (
            <div>
              <Label key={item.id}>
                <Input
                  {...register(`showtimes.${index}.time`)}
                  type="datetime-local"
                />
              </Label>
              <Button
                className="text-xs border border-dashed -mt-4"
                size="sm"
                variant="link"
                onClick={() => remove(index)}
              >
                <Plus className="w-4 h-4" /> Remove
              </Button>
            </div>
          ))}
        </div>
      </Label>

      <Button
        className="flex items-center justify-center w-full py-2 mt-2 text-xs border border-dashed"
        size="sm"
        variant="link"
        onClick={() =>
          append({
            time: '',
          })
        }
      >
        <Plus className="w-4 h-4" /> Add show
      </Button>
    </div>
  )
}

export const SelectMovie = () => {
  const { data, isLoading } = trpcClient.movies.movies.useQuery()
  const { setValue } = useFormContext<FormTypeCreateShowtime>()

  return (
    <Label title="Movie">
      <select
        onChange={(event) => setValue('movieId', Number(event.target.value))}
        className="w-full px-3 py-2 border rounded border-input"
      >
        {isLoading ? (
          <option value="">Loading...</option>
        ) : (
          <option value="">Select a movie...</option>
        )}

        {data?.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>
    </Label>
  )
}

export const SelectScreen = () => {
  const { data, isLoading } = trpcClient.cinemas.myScreens.useQuery()
  const { setValue } = useFormContext<FormTypeCreateShowtime>()

  return (
    <Label title="Screen number">
      <select
        onChange={(event) => setValue('screenId', Number(event.target.value))}
        className="w-full px-3 py-2 border rounded border-input"
      >
        {isLoading ? (
          <option value="">Loading...</option>
        ) : (
          <option value="">Select a screen...</option>
        )}

        {data?.map((screen) => (
          <option key={screen.id} value={screen.id}>
            {screen.Cinema.name} - {screen.number}
          </option>
        ))}
      </select>
    </Label>
  )
}
