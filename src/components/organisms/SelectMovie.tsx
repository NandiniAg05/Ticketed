'use client'
import { Loading } from '@/components/molecules/Loading'
import { trpcClient } from '@/trpc/clients/client'
import { useHandleSearch } from '@/utils/hooks'
import { CinemaSelectCard } from '../molecules/CinemaSelectCard'
import { AlertBox } from '../molecules/AlertBox'

export const SelectMovie = ({ cinemaId }: { cinemaId: number }) => {
  const { data, isLoading } = trpcClient.movies.moviesPerCinema.useQuery({
    cinemaId,
  })

  const { params, addParam, deleteParams } = useHandleSearch()

  if (data?.length === 0) {
    return <AlertBox>Currently no shows are running in this cinema.</AlertBox>
  }

  return (
    <div>
      <div>Select movie</div>
      {isLoading ? <Loading /> : null}

      <div className="grid grid-cols-3 gap-2">
        {data?.map((movie) => (
          <button
            key={movie.id}
            onClick={() => {
              addParam('movieId', movie.id)
              deleteParams(['showtimeId', 'screenId'])
            }}
          >
            <CinemaSelectCard
              movie={movie}
              selected={params.get('movieId') === movie.id.toString()}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
