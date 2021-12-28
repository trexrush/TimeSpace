// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

interface IEvent {
  event: String,
  wca: Boolean
  WCAsingle?: number,
  WCAaverage?: number,
  single?: number,
  average: any[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    const userRoute: any = req.query
    const wcaRes = await axios('https://www.worldcubeassociation.org/api/v0/persons/2013mazu02')
    let WCAevents = wcaRes.data.personal_records
    let result: any = {}
    for (let key in WCAevents) {
        let postEvents: any = await prisma.event.findFirst({
            where: {
                eventName: key
            }
        })
        result[key] = postEvents
    }
    res.json(result)
  }
  else {
  }
}

