import { objectType } from "nexus"

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.string("id")
    t.string("title")
    t.nullable.string("status")
    t.string("description")
    t.string("userId")
    // t.nonNull.string('createdAt')
    t.field("user", {
      type: "User",
      async resolve(parent, _, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .user()
      },
    })
  },
})
