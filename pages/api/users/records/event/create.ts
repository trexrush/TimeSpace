import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'

export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
    if (req.method === 'POST') {
        console.log(req.body.username, req.body.eventName)

        const checkSameEvent = await prisma.event.findFirst({
            where: {
                eventName: req.body.eventName,
                username: req.body.username
            }
        })
        console.log(JSON.stringify(checkSameEvent))

        if (checkSameEvent !== null) {
            res.status(200).send("Event already exists.") // kinda scuffy to send an ok code here but I dont want to throw error
        }
        else {
            const newEvent = await prisma.event.create({
                data: {
                    eventName: req.body.eventName,
                    username: req.body.username
                }
            })
    
            const updatedData = prisma.event.findMany({
                where: {
                    username: req.body.username
                }
            })
            console.log(updatedData)
            res.status(200).send(updatedData)
        }
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}