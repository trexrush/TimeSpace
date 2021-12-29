// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import axios from 'axios'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const session = await getSession({ req })
    // @ts-ignore
    const oldName: string = req.query.name

    if (req.method === 'POST') {
        const newName = req.body.val
        console.log(oldName, newName)
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