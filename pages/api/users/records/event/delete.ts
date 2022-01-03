import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'

export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
    if (req.method === 'DELETE') {
        res.status(200).send("deleted")
    }
    else {
        res.status(400).send({ message: 'Invalid Method' })
        return
    }
}