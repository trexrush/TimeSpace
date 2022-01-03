import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { prisma } from '../../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    //get wca info (this is required for stuff to load FOR THE TIME BEING)
    const userRoute: any = req.query.name
    console.log(userRoute)
    const userWca: any = await prisma.sheet.findUnique({
      where: {
        username: userRoute
      }
    })
    console.log("wcaid:", userWca.wcaid)
    if (userWca.wcaid) {
      const wcaRes = await axios(`https://www.worldcubeassociation.org/api/v0/persons/${userWca?.wcaid}`)
      let WCAevents = wcaRes.data.personal_records
      console.log(WCAevents)

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
            WCAsingle: WCAevents[key].single?.best,
            WCAaverage:WCAevents[key].average?.best,
            ...postEvents
          }
          result[key] = temp
      }
      res.json(result)
    }
    else {
      console.log("no wca account logged you stinky poo")
      res.json(null)
    }
  }
  else {
    res.status(400).send({ message: 'Invalid Method' })
    return
  }
}

