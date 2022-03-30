import { NextApiResponse, NextApiRequest } from "next"
import { PrismaClient, User } from "@prisma/client"
import prisma from "../lib/prisma"
import { getSession } from "next-auth/react"

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
  // user: User | null
  // email: string;
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
  const context: Context = {
    ...req,
    req: req,
    res: res,
    prisma: prisma,
    // user: null,
  }
  // if (session) {
  //   const user = await prisma.user.findFirst({
  //     where: {
  //       email: session.user.email,
  //     },
  //     rejectOnNotFound: true,
  //   })
  //   context.user = user
  // }

  return context
}
