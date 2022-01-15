import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
    if (req.method === 'POST') {
        // console.log(req.body)

        let updateVal = req.body.val
        if (updateVal === '') {
            updateVal = null
        }


        switch(req.body.type) {
            case 'single':
                await prisma.$queryRaw`
                UPDATE public.event
                SET single = ${updateVal}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'mo_3':
                await prisma.$queryRaw`
                UPDATE public.event
                SET mo_3 = ${updateVal}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_5':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_5 = ${updateVal}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_12':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_12 = ${updateVal}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_25':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_25 = ${updateVal}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_50':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_50 = ${updateVal}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            case 'ao_100':
                await prisma.$queryRaw`
                UPDATE public.event
                SET ao_100 = ${updateVal}
                WHERE username = ${req.body.userData.username} AND "eventName" = ${req.body.eventname}`
                break
            default:
                res.status(400).send("invalid average type.")        
        }
        res.status(200).send(updateVal)
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}