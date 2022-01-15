import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const oldData: any = req.body.data.data
    let newData = req.body.val

    if (req.method === 'POST') {

        if (newData === "") {
            newData = null
        }
        else {
            const updateIntegration = await prisma.sheet.update({
                where: {
                    username: oldData.username
                },
                data: {
                    wcaid: newData,
                }
            })
            res.status(200).send(updateIntegration)
        }
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}