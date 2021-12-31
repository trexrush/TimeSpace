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
                SELECT ac.username username, name, email, u.id userId, ac.id actId
                FROM public.account as ac, public.user as u
                WHERE u.id = ac."userId" and email = ${userEmail};`
            console.log(fullUser, userEmail)
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