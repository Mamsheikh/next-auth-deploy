import { NextApiResponse, NextApiRequest } from "next"
import { PrismaClient } from "@prisma/client"
import prisma from "../lib/prisma"
import { getSession } from "next-auth/react"
import { User } from "next-auth"

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
  email: string | null
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
    email: null,
  }
  if (session) {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      rejectOnNotFound: true,
    })
    context.email = user.email
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
