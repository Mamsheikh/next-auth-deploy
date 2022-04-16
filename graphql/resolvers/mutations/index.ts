import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"
import { extendType, nonNull, stringArg } from "nexus"
import { resolve } from "path"

export const TaskMutaion = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTask", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        try {
          //   const req = ctx.req
          //   const session = await getSession({ req })
          console.log("creating user....")
          // console.log("ctx.session", ctx.session)
          // if (ctx.session) {
          return ctx.prisma.user.create({
            data: {
              email: args.email,
              name: "Muneer",
              image: "image",
            },
          })
          // } else {
          // throw new Error("No session found")
          // }
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
            let req: NextApiRequest
            // const req = ctx.req
            // const session = await getSession({ req })
            // console.log({ session })
            if (!ctx.session) {
              throw new Error("no session found")
            }
            return ctx.prisma.task.create({
              data: {
                title: args.title,
                description: args.description,
                status: args.status,
                user: { connect: { email: ctx.session?.user?.email } },
              },
            })
          } catch (error) {
            throw new Error(`failed to create task: ${error}`)
          }
        },
      })
  },
})
