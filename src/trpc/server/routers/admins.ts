import { schemaCreateAdmin } from '@/forms/createAdmin'
import { createTRPCRouter, protectedProcedure } from '..'
import { TRPCError } from '@trpc/server'

export const adminsRouter = createTRPCRouter({
  dashboard: protectedProcedure('admin').query(async ({ ctx }) => {
    const [cinema, movie, admin, manager, user] = await Promise.all([
      ctx.db.cinema.count(),
      ctx.db.movie.count(),
      ctx.db.admin.count(),
      ctx.db.manager.count(),
      ctx.db.user.count(),
    ])

    return { cinema, movie, admin, manager, user }
  }),

  findAll: protectedProcedure('admin').query(async ({ ctx }) => {
    return ctx.db.admin.findMany({ include: { User: true } })
  }),
  adminMe: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.admin.findUnique({ where: { id: ctx.userId } })
  }),
  create: protectedProcedure('admin')
    .input(schemaCreateAdmin)
    .mutation(async ({ ctx, input }) => {
      const existingAdmin = await ctx.db.admin.findUnique({
        where: { id: input.id },
      })
      if (existingAdmin) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Admin with this ID already exists',
        })
      }
      return ctx.db.admin.create({ data: input })
    }),
})
