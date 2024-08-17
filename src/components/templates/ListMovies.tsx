import { Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { trpcServer } from '@/trpc/clients/server'
import { RouterOutputs } from '@/trpc/clients/types'
import { MovieInfo } from '../organisms/MovieInfo'

export interface IListMoviesProps {}

async function getUser() {
  try {
    const data = await trpcServer.movies.movies.query()
    return data || []
  } catch (err) {
    return []
  }
}

export const ListMovies = async ({}: IListMoviesProps) => {
  const movies = await getUser()

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href={'/admin/movies/new'}
          className="flex items-center gap-2 my-2"
        >
          <Plus /> Create movie
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {movies.map((movie) => (
          <MovieInfo key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
