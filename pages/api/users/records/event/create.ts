import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
    if (req.method === 'POST') {
        console.log(req.body.username, req.body.eventName)
        const newEvent = await prisma.event.create({
            data: {
                eventName: req.body.eventName,
                username: req.body.username
            }
        })
        //temp
        const updatedShit = prisma.event.findMany()
        console.log(updatedShit)
        res.status(200).send("gucci added")
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}