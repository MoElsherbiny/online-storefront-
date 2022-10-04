import express, { Request, Response } from 'express'
import verifyAuthToken from '../middleware/Verify'
import { orders } from '../models/orders'

const order = new orders()

export const index = async (_req: Request, res: Response) => {
  try {
    const orderData = await order.index()
    res.send(orderData)
  } catch (error) {
    res.status(400)
    res.json({
      message: 'incorrect order request',
    })
  }
}
const show = async (req: Request, res: Response) => {
  try {
    const showOrder = await order.show(req.params.id as unknown as number)
    if (showOrder) {
      res.send({
        status: '200',
        Order_Information: { ...showOrder },
      })
    } else
      res.json({
        message: 'You have not yet made this order.',
      })
  } catch (error) {
    res.status(400)
  }
}
export const create = async (req: Request, res: Response) => {
  try {
    const CreateOrders = await order.create(req.body)
    res.json({
      status: '200',
      Order_Information: { ...CreateOrders },
      message: 'order successfully created',
    })
  } catch (error) {
    res.status(400).json({
      message: 'order not finished',
    })
  }
}
export const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id
  const productId: number = req.body.productId
  const quantity: number = parseInt(req.body.quantity)

  try {
    const addedProduct = await order.addProduct(quantity, orderId, productId)
    res.status(200).json({
      data: { ...addedProduct },
    })
    console.log(addedProduct)
  } catch (err) {
    res.status(400)
    res.json({ message: 'Check your order id and try again.' })
  }
}

export const orders_routes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', create)
  app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default orders_routes
