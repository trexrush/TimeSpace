// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    const userRoute: any = req.query.name
    const wcaRes = await axios('https://www.worldcubeassociation.org/api/v0/persons/2013mazu02')
    console.log(userRoute)
    let WCAevents = wcaRes.data.personal_records
    let result: any = {}
    for (let key in WCAevents) {
        // query from postgres
        //@ts-ignore
        let postEvents: any = await prisma.event.findFirst({
            where: {
                eventName: key,
                username: userRoute
            }
        })

        // if no event in postgres, skip the wca entry
        if (postEvents === undefined || postEvents === null) {
          continue
        }

        // build the return value
        let temp = {
          wca: true,
          WCAsingle: WCAevents[key].single.best,
          WCAaverage:WCAevents[key].average.best,
          ...postEvents
        }
        result[key] = temp
    }
    res.json(result)
  }
  else {
  }
}

