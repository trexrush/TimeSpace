import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

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
        try {
            const newEvent = await prisma.event.create({
                data: {
                    eventName: req.body.eventName,
                    username: req.body.username
                }
            })
        } catch (e) {
            console.log("beep boop throw error")
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
              // The .code property can be accessed in a type-safe manner
              if (e.code === 'P2002') {
                console.log(
                  'There is a unique constraint violation, a new event cannot be created with this name'
                )
              }
            }
            throw e
        }

        const updatedData = prisma.event.findMany({
            where: {
                username: req.body.username
            }
        })
        console.log(updatedData)
        res.status(200).send(updatedData)
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}