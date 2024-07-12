'use client'
import { Map } from '../organisms/Map/Map'
import { Panel } from '../organisms/Map/Panel'
import { DefaultZoomControls } from '../organisms/Map/ZoomControls'
import { MapPinnedIcon } from 'lucide-react'
import { LngLatBounds, useMap } from 'react-map-gl'
import { SimpleDialog } from '../molecules/SimpleDialog'
import { cities } from '@/utils/static'
import { useKeypress, useHandleSearch, useGetCinema } from '@/utils/hooks'
import { useEffect, useMemo, useState } from 'react'
import { trpcClient } from '@/trpc/clients/client'
import { Marker } from '../organisms/Map/MapMarker'
import { ReactNode } from 'react'
import { BrandIcon } from '../ui/BrandIcon'
import { RouterOutputs } from '@/trpc/clients/types'
import { SelectMovie } from '../organisms/SelectMovie'
import { SelectShowtimes } from '../organisms/SelectShowtimes'
import { SelectSeats } from '../organisms/SelectSeats'
import { useRouter } from 'next/navigation'

export const SearchCinemas = () => {
  return (
    <Map>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      <DisplayCinemas />
      <Panel position="left-top">
        <SetCity />
      </Panel>
    </Map>
  )
}

export const SetCity = () => {
  const [open, setOpen] = useState(false)
  const { current: map } = useMap()

  useKeypress(['L', 'l'], () => setOpen((state) => !state))

  return (
    <div>
      <button
        className="flex flex-col items-center gap-1"
        onClick={() => setOpen(true)}
      >
        <MapPinnedIcon />
        <div className="flex items-center justify-center w-4 h-4 border rounded shadow">
          L
        </div>
      </button>
      <SimpleDialog open={open} setOpen={setOpen} title="Select City">
        <div className="grid grid-cols-3 gap-3">
          {cities.map((city) => (
            <button
              className="p-3 rounded hover:shadow-2xl transition-shadow border"
              key={city.id}
              onClick={() => {
                map?.flyTo({
                  center: { lat: city.lat, lng: city.lng },
                  zoom: 10,
                  essential: true,
                })
                setOpen(false)
              }}
            >
              <div>{city.name}</div>
              <div>{city.englishName}</div>
            </button>
          ))}
        </div>
      </SimpleDialog>
    </div>
  )
}

export const DisplayCinemas = () => {
  const { current: map } = useMap()
  const [bounds, setBounds] = useState<LngLatBounds>()

  useEffect(() => {
    const handleBounds = () => {
      const bounds = map?.getBounds()
      if (bounds) {
        setBounds(bounds)
      }
    }
    map?.on('load', handleBounds)
    map?.on('dragend', handleBounds)
    map?.on('zoomend', handleBounds)
  }, [map])

  const locationFilter = useMemo(
    () => ({
      ne_lat: bounds?.getNorthEast().lat || 0,
      ne_lng: bounds?.getNorthEast().lng || 0,
      sw_lat: bounds?.getSouthWest().lat || 0,
      sw_lng: bounds?.getSouthWest().lng || 0,
    }),
    [bounds],
  )

  const { data, refetch } = trpcClient.cinemas.searchCinemas.useQuery({
    addressWhere: locationFilter,
  })

  console.log('data', data)

  //   useEffect(() => {
  //     refetch()
  //   }, [bounds, refetch])

  return (
    <>
      <MovieDialog />
      {data?.map((cinema) => <MarkerCinema key={cinema.id} cinema={cinema} />)}
    </>
  )
}

export const MarkerCinema = ({
  cinema,
}: {
  cinema: RouterOutputs['cinemas']['searchCinemas'][0]
}) => {
  const { addParam } = useHandleSearch()

  if (!cinema.Address?.lat || !cinema.Address?.lng || !cinema.id) {
    return null
  }

  return (
    <Marker
      anchor="bottom"
      latitude={cinema.Address.lat}
      longitude={cinema.Address.lng}
      onClick={() => {
        addParam('cinemaId', cinema.id)
      }}
      className="cursor-pointer"
    >
      <BrandIcon />
      <MarkerText>{cinema.name.split(' ').slice(0, 2).join(' ')}</MarkerText>
    </Marker>
  )
}
export const MarkerText = ({ children }: { children: ReactNode }) => (
  <div className="absolute max-w-xs -translate-x-1/2 left-1/2">
    <div className="mt-1 leading-4 text-center min-w-max px-0.5 rounded backdrop-blur-sm bg-white/50">
      {children}
    </div>
  </div>
)

export const MovieDialog = () => {
  const { params, deleteAll } = useHandleSearch()

  const cinemaId = params.get('cinemaId')
  const movieId = params.get('movieId')
  const screenId = params.get('screenId')
  const showtimeId = params.get('showtimeId')
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(Boolean(cinemaId))
  const { cinema } = useGetCinema({ cinemaId })
  const { current: map } = useMap()
  useEffect(() => {
    if (cinema?.Address) {
      setOpenDialog(true)
      map?.flyTo({
        center: { lat: cinema.Address.lat, lng: cinema.Address.lng },
        zoom: 10,
      })
    } else {
      setOpenDialog(false)
    }
  }, [cinema, map])

  if (!cinema) {
    return null
  }

  const handleDialogClose: React.Dispatch<React.SetStateAction<boolean>> = (state) => {
    if (typeof state === 'boolean' && !state) {
      deleteAll();
      router.push('/');
    }
    setOpenDialog(state);
  };

  return (
    <SimpleDialog
      title={cinema.name}
      open={openDialog}
      setOpen={handleDialogClose}
    >
      <div className="space-y-8">
        <SelectMovie cinemaId={cinema.id} />

        {movieId ? (
          <SelectShowtimes
            cinemaId={cinema.id}
            movieId={+movieId}
            showtimeId={showtimeId ? +showtimeId : null}
          />
        ) : null}

        {screenId && showtimeId ? (
          <SelectSeats showtimeId={+showtimeId} screenId={+screenId} />
        ) : null}
      </div>
    </SimpleDialog>
  )
}
