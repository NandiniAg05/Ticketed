import { createTRPCRouter, publicProcedure, protectedProcedure } from '..'
import { moviesRouter } from './movies'
import { adminsRouter } from './admins'
import { cinemasRouter } from './cinemas'
import { managerRoutes } from './managers'
import { showtimesRoutes } from './showtimes'
import { stripeRoutes } from './stripe'
import { ticketsRoutes } from './tickets'

export const appRouter = createTRPCRouter({
  movies: moviesRouter,
  admins: adminsRouter,
  cinemas: cinemasRouter,
  managers: managerRoutes,
  showtimes: showtimesRoutes,
  stripe: stripeRoutes,
  tickets: ticketsRoutes,
})

export type AppRouter = typeof appRouter
