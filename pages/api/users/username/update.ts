import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const oldData: any = req.body.data.data
    const newName = req.body.val
    console.log(newName, oldData)

    if (req.method === 'POST') {

        if (newName === "") { // or collision
            console.log("collision or empty string")
            const error = "this name is empty or already exists. Try again"
            console.log(error)
            res.status(400).send(error)
        }
        else {
            console.log("aite bossman gonna change your username")
            const updateUser = await prisma.account.update({
                where: {
                    id: oldData.actid
                },
                data: {
                    username: newName,
                }
            })
            console.log(updateUser)
            res.status(200).send(updateUser)
        }
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}