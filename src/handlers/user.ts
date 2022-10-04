import express, { Request, Response } from 'express'
import { Store, Users } from '../models/users'
import * as Jwt from 'jsonwebtoken'

import verifyAuthToken from '../middleware/Verify'

const stores = new Store()

const SecretToken = process.env.TOKEN_SECRET as string

const index = async (_req: Request, res: Response) => {
  try {
    const users = await stores.index()
    if (!users) {
      res.status(404).json({
        message: 'users not found',
      })
    }
    return res.json({
      status: '200',
      UsersData: { ...users },
      message: 'users exist',
    })
  } catch (error) {
    throw Error('bad request')
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const userData = await stores.show(req.params.id as unknown as number)
    if (userData) {
      res.json({
        status: '200',
        User_Data: userData,
        message: 'The user exists.',
      })
    } else {
      return res.status(404).json({
        message: 'This user does not exist; please try again with a valid id.',
      })
    }
  } catch (error) {
    throw Error(`This user does not exist; please try again with a valid id.`)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, password } = req.body
    if (!firstname || !lastname || !password) {
      return res.status(400).send('ERROR, incorrect data missing')
    }

    const user: Users = { firstname, lastname, password }
    const newUser = await stores.create(user)
    const Token = Jwt.sign({ user: newUser }, SecretToken)
    res.json({
      status: '200',
      user_Data: newUser,
      Your_Token_Secret_Key: Token,
    })
  } catch (error) {
    const errors = error as Error
    if (errors.message.includes('failed to register a user')) {
      res.status(500).json(errors.message)
    } else {
      res.status(401).json(errors.message)
    }
  }
}
export const authenticate = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body
    const user = await stores.authenticate(id, password)

    console.log(user)
    if (user) {
      const GenerateToken = Jwt.sign({ user }, SecretToken)
      console.log(GenerateToken)

      res.status(200).json({
        message: 'user exist here is you token',
        SecretToken: { ...user, GenerateToken },
      })
    } else {
      res.status(401).json({
        message: 'user not exist',
      })
    }
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

const users_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/id', verifyAuthToken, show)
  app.post('/users', create)
  app.post('/users/login', authenticate)
}

export default users_routes
