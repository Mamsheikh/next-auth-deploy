import { NextApiResponse, NextApiRequest } from "next"
import { PrismaClient } from "@prisma/client"
import prisma from "../lib/prisma"
import { getSession } from "next-auth/react"
import { DefaultUser, User } from "next-auth"

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
  // user: DefaultUser | null
  email: string | null
  // user: User;
}
// const user = await prisma.user.findUnique({
//   where:{email:session.user.email}
// })
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<Partial<Context>> {
  const session = await getSession({ req })
  // const user = await prisma.user.findUnique({
  //   where: { email: session.user.email },
  // })
  return {
    req,
    res,
    prisma,
    email: session?.user?.email,
  }
}

// export async function createContext({ req, res }): Promise<Context> {
//   const { user, accessToken } = getSession(req, res);
//   return {
//     user,
//     accessToken,
//     prisma,
//   };
// }
