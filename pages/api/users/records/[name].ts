import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { prisma } from '../../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {

    const userRoute: any = req.query.name

    const userWca: any = await prisma.sheet.findUnique({
      where: {
        username: userRoute
      }
    })

    let dbEvents: any = await prisma.event.findMany({
      where: {
          username: userRoute
      }
    })

    let result: any = {}

    if (userWca.wcaid) {
      const wcaRes = await axios(`https://www.worldcubeassociation.org/api/v0/persons/${userWca?.wcaid}`)
      let WCAevents = wcaRes.data.personal_records

      for (let ev of dbEvents) {
        let currEvent = ev
        if (WCAevents.hasOwnProperty(ev.eventName)) {
          currEvent = {
            wca: true,
            WCAsingle: WCAevents[ev.eventName].single?.best,
            WCAaverage:WCAevents[ev.eventName].average?.best,
            ...ev
          }
        }
        else {
          currEvent = {
            wca: false,
            ...ev
          }
        }
        result[ev.eventName] = currEvent
      }
      
      res.json(result)
    }
    else { //no registered wca account

      for (let ev of dbEvents) {
        let currEvent = {
          wca: false,
          ...ev
        }
        result[ev.eventName] = currEvent
      }

      res.json(result)
    }
  }
  else {
    res.status(400).send({ message: 'Invalid Method' })
    return
  }
}

