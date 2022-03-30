import { getSession } from "next-auth/react"
import { extendType, stringArg } from "nexus"
import { resolve } from "path"

export const TaskMutaion = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTask", {
      type: "User",
      async resolve(_, args, ctx) {
        try {
          const req = ctx.req
          const session = await getSession({ req })
          console.log({ session })
          if (session) {
            return ctx.prisma.user.create({
              data: {
                email: session?.user?.email,
                name: session?.user?.name,
                image: session?.user?.image,
              },
            })
          } else {
            throw new Error("No session found")
          }
        } catch (error) {
          throw new Error(`failed to create user: ${error}`)
        }
      },
    }),
      t.field("taskCreate", {
        type: "Task",
        args: {
          title: stringArg(),
          description: stringArg(),
          status: stringArg(),
        },
        async resolve(_, args, ctx) {
          try {
            const req = ctx.req
            const session = await getSession({ req })
            console.log({ session })
            if (!session) {
              throw new Error("no session found")
            }
            return ctx.prisma.task.create({
              data: {
                title: args.title,
                description: args.description,
                status: args.status,
                user: { connect: { email: session?.user?.email as string } },
              },
            })
          } catch (error) {
            throw new Error(`failed to create task: ${error}`)
          }
        },
      })
  },
})
