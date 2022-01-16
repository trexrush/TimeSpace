import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const oldData: any = req.body.data.data
    const newName = req.body.val

    const collisions = await prisma.account.findMany({
        where: {
            username: newName
        }
    })

    if (req.method === 'POST') {

        if (newName === "" || collisions.length !== 0) { // or collision
            const error = "This username is empty or is already taken. Try again."
            res.status(200).send({ message: error })
        }
        else {
            const updateUser = await prisma.account.update({
                where: {
                    id: oldData.actid
                },
                data: {
                    username: newName,
                }
            })

            const addSheet = await prisma.sheet.create({
                data: {
                    username: newName
                }
            })

            res.status(200).send({ message: "Welcome to TimeSpace!"})
            // res.status(200)
        }
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}