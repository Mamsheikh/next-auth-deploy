import { NextApiResponse, NextApiRequest } from "next"
import { PrismaClient } from "@prisma/client"
import prisma from "../lib/prisma"
import { getSession } from "next-auth/react"
import { Session, User } from "next-auth"

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
  session: Session | null
  // email: string;
  // user: User;
}
// const user = await prisma.user.findUnique({
//   where:{email:session.user.email}
// })
export default async function createContext({
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
  console.log("session mofuker", { session })
  const context: Context = {
    ...req,
    req: req,
    res: res,
    prisma: prisma,
    session,
  }

  return context
}

// export type Context = {
//   user: User;
//   accessToken: string;
//   prisma: PrismaClient;
// };
// export async function createContext({ req, res }): Promise<Context> {
//   const { user, accessToken } = getSession(req, res);
//   return {
//     user,
//     accessToken,
//     prisma,
//   };
// }
