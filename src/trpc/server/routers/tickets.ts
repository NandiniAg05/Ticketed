import { createTRPCRouter, protectedProcedure } from '..'

export const ticketsRoutes = createTRPCRouter({
  myTickets: protectedProcedure().query(({ ctx }) => {
    console.log('myTickets route hit')
    return ctx.db.ticket.findMany({
      where: { uid: ctx.session.userId as string },
      include: {
        Bookings: {
          include: {
            Showtime: {
              include: { Movie: true, Screen: { include: { Cinema: true } } },
            },
          },
        },
      },
    })
  }),
})
