import { enumType, objectType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("name")
    t.nonNull.string("email")
    t.string("image")
  },
})

const Role = enumType({
  name: "Role",
  members: ["FREE", "SUBSCRIBED"],
})
