import { schemaCreateManager } from '@/forms/createManager'
import { createTRPCRouter, protectedProcedure } from '..'
import { TRPCError } from '@trpc/server'

export const managerRoutes = createTRPCRouter({
  create: protectedProcedure('admin')
    .input(schemaCreateManager)
    .mutation(async ({ ctx, input }) => {
      const existingManager = await ctx.db.manager.findUnique({
        where: { id: input.id },
      })

      if (existingManager) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Manager with this id already exists',
        })
      }
      return ctx.db.manager.create({ data: input })
    }),
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.manager.findMany({
      include: {
        User: true,
      },
    })
  }),
  managerMe: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.manager.findUnique({ where: { id: ctx.userId } })
  }),
  dashboard: protectedProcedure('admin', 'manager').query(async ({ ctx }) => {
    const uid = ctx.userId
    const [cinema, showtime] = await Promise.all([
      ctx.db.cinema.count({ where: { Managers: { some: { id: uid } } } }),
      ctx.db.showtime.count({
        where: { Screen: { Cinema: { Managers: { some: { id: uid } } } } },
      }),
    ])

    return { cinema, showtime }
  }),
})
