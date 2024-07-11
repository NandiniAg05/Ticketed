import { Loading } from '@/components/molecules/Loading'
import { trpcClient } from '@/trpc/clients/client'
import { formatDate, random } from '@/utils/functions'
import { useHandleSearch } from '@/utils/hooks'
import { noShowsMessages } from '@/utils/static'
import { Armchair, Box } from 'lucide-react'
import { RouterOutputs } from '@/trpc/clients/types'
import { format } from 'date-fns'

export const SelectShowtimes = ({
  cinemaId,
  movieId,
  showtimeId,
}: {
  cinemaId: number
  movieId: number
  showtimeId?: number | null
}) => {
  const { addParam } = useHandleSearch()

  const { data, isLoading } = trpcClient.showtimes.showtimesPerCinema.useQuery({
    cinemaId,
    movieId,
  })

  return (
    <div>
      <div>Select showtime</div>
      {isLoading ? <Loading /> : null}

      <div className="flex flex-col gap-4 ">
        {data?.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center w-full text-gray-800 rounded h-36 bg-gray-50">
              <div className="flex items-center gap-1 text-lg font-semibold">
                <Box />
                <div>No shows.</div>
              </div>
              <div className="max-w-xs text-sm text-center">
                {random(noShowsMessages)}
              </div>
            </div>
          </>
        ) : null}
        {data?.map((date) => (
          <div key={date.date} className="w-full">
            <div className="mb-2 text-lg font-semibold">
              {formatDate(date.date)}
            </div>
            <div className="grid grid-cols-3 gap-2 ">
              {[...date.showtimes]
                .sort((a, b) => {
                  console.log('a, b', a.startTime, b.startTime)
                  return (
                    new Date(a.startTime).getTime() -
                    new Date(b.startTime).getTime()
                  )
                })
                .map((showtime) => (
                  <button
                    key={showtime.id}
                    onClick={() => {
                      addParam('showtimeId', showtime.id)
                      addParam('screenId', showtime.screenId)
                    }}
                  >
                    <ShowtimeSelectCard
                      selected={showtime.id === showtimeId}
                      key={showtime.id}
                      showtime={showtime}
                    />
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export interface IShowtimeSelectCardProps {
  showtime: RouterOutputs['showtimes']['showtimesPerCinema'][number]['showtimes'][number]
  selected?: boolean
}

export const ShowtimeSelectCard = ({
  showtime,
  selected = false,
}: IShowtimeSelectCardProps) => {
  console.log('Start time ', showtime.startTime)
  return (
    <div
      className={`flex border p-1 rounded flex-col items-start ${
        selected ? 'shadow-lg border-primary shadow-black/30' : ''
      }`}
    >
      <div className="text-sm font-bold">
        {format(new Date(showtime.startTime), 'p')}
      </div>
      <div className="text-sm">Rs.{showtime.Screen.price}</div>
      <div className="text-xs ">{showtime.Screen.projectionType}</div>
      <div className="text-xs ">{showtime.Screen.soundSystemType}</div>
      <ShowRemainingSeats showtimeId={showtime.id} />
    </div>
  )
}

export const ShowRemainingSeats = ({ showtimeId }: { showtimeId: number }) => {
  const { data } = trpcClient.showtimes.seatsInfo.useQuery({
    showtimeId,
  })
  const totalSeats = data?.total || 0
  const bookedseats = data?.booked || 0
  const remainingSeats = totalSeats - bookedseats
  return (
    <div className="text-xs mt-2">
      {remainingSeats}/{totalSeats} <Armchair className="inline w-4 h-4" />
    </div>
  )
}
