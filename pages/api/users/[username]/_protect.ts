import { NextApiRequest, NextApiResponse } from 'next/types'
import { getSession } from 'next-auth/react'

export const protect = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const session = await getSession({ req })
  if (session) {
    console.log(session)
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized')
  }
}