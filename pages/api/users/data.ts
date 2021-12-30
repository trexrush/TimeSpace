import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const session: any = await getSession({ req })
    
    if (req.method === "GET") {
        if (session) {
            const userEmail: string = session.user.email
            const fullUser: any = await prisma.$queryRaw`
                SELECT username, name, email
                FROM public.account as ac, public.user as u
                WHERE u.id = ac."userId" and email = ${userEmail};`

            // console.log(fullUser, userEmail)
            // console.log(fullUser[0].email, userEmail)
            res.json(fullUser)
            return
        }
        else {
            res.status(400).send({ message: 'Not Logged In' })
            return
        }
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}