// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const oldName: any = req.query.name

    if (req.method === 'POST') {
        const newName = req.body.val
        console.log(newName, oldName)
        const updateUser = await prisma.account.update({
            where: {
                username: oldName,
            },
            data: {
                username: newName,
            }
        },)
        res.status(200).send("all gucci")
    }
  else {
    res.status(400).send({ message: 'Invalid Method' })
    return
  }
}