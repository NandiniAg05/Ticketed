'use client'

import { useFormCreateMovie } from '@/forms/createMovie'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { HtmlSelect } from '../ui/select'
import { Genre } from '@prisma/client'
import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/toaster/use-toast'
import { useRouter } from 'next/navigation'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { useImageUpload } from '@/utils/hooks'
import { ImagePreview } from '../molecules/ImagePreview'
import { Controller } from 'react-hook-form'
import { ProgressBar } from '../molecules/ProgressBar'

export interface ICreateMovieProps {}

export const CreateMovie = ({}: ICreateMovieProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    resetField,
    watch,
  } = useFormCreateMovie()

  const { posterUrl } = watch()
  const {
    data,
    isLoading,
    mutateAsync: createMovie,
  } = trpcClient.movies.createMovie.useMutation()

  const [{ percent, uploading }, uploadImages] = useImageUpload()

  const { toast } = useToast()
  const router = useRouter()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log('Form submitted:', data)
        const images = await uploadImages(data.posterUrl)
        const movie = await createMovie({ ...data, posterUrl: images[0] })
        if (movie) {
          reset()
          toast({ title: `Movie ${data.title} craeted successfully.` })
          revalidatePath('/admin/movies')
          router.replace('/admin/movies')
        }
      })}
      className="grid grid-cols-2 gap-2"
    >
      <div>
        <Label title="Title" error={errors.title?.message}>
          <Input placeholder="Enter Movie Title" {...register('title')} />
        </Label>
        <Label title="Director Name" error={errors.director?.message}>
          <Input placeholder="Director's Name" {...register('director')} />
        </Label>
        <Label title="Duration" error={errors.duration?.message}>
          <Input
            placeholder="Movie Duration"
            {...register('duration', { valueAsNumber: true })}
          />
        </Label>
        <Label title="Release date" error={errors.releaseDate?.message}>
          <Input
            placeholder="Release Date"
            type="date"
            {...register('releaseDate', {
              setValueAs: (value) => {
                const date = new Date(value)
                return isNaN(date.getTime()) ? '' : date.toISOString()
              },
            })}
          />
        </Label>
        <Label title="Genre" error={errors.genre?.message}>
          <HtmlSelect placeholder="projection type" {...register(`genre`)}>
            {Object.values(Genre).map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </HtmlSelect>
        </Label>
      </div>
      <div>
        <ImagePreview
          src={posterUrl}
          clearImage={() => resetField('posterUrl')}
        >
          <Controller
            control={control}
            name={`posterUrl`}
            render={({ field }) => (
              <Input
                type="file"
                accept="image/*"
                multiple={false}
                onChange={(e) => field.onChange(e?.target?.files)}
              />
            )}
          />
        </ImagePreview>
        <ProgressBar value={percent} />
      </div>
      <Button loading={isLoading || uploading} type="submit">
        Submit
      </Button>
    </form>
  )
}
