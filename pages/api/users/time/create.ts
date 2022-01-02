import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
    if (req.method === 'POST') {
        console.log(req.body)

        switch(req.body.type) {
            case 'single':
                await prisma.$queryRaw`
                UPDATE public.event
                SET single = ${req.body.val}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'mo_3':
                await prisma.$queryRaw`
                UPDATE public.event
                SET mo_3 = ${req.body.val}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_5':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_5 = ${req.body.val}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_12':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_12 = ${req.body.val}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_25':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_25 = ${req.body.val}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_50':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_50 = ${req.body.val}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_100':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_100 = ${req.body.val}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            default:
                res.status(400).send("invalid average type.")        
        }
        res.status(200).send(req.body.val)
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}