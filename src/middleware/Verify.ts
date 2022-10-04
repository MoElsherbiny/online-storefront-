import { Request, Response, NextFunction } from 'express'
import * as Jwt from 'jsonwebtoken'

const SecretToken = process.env.TOKEN_SECRET as string

const verifyAuthToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    const decoded = Jwt.verify(token as string, SecretToken)
    if (decoded) {
      next()
    }
  } catch (error) {
    throw Error('data failed')
  }
}

export default verifyAuthToken
