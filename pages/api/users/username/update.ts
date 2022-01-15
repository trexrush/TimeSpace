import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const oldData: any = req.body.data.data
    const newName = req.body.val

    if (req.method === 'POST') {

        if (newName === "") { // or collision
            const error = "this name is empty or already exists. Try again"
            res.status(400).send(error)
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
            res.status(200).send(updateUser)
        }
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}