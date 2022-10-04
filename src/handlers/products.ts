import express, { Request, Response } from 'express'
import { products } from '../models/products'
import verifyAuthToken from '../middleware/Verify'

const product = new products()
const index = async (_req: Request, res: Response) => {
  try {
    const productData = await product.index()
    if (productData) {
      res.json(productData)
    } else {
      res.status(400).json({
        message: 'The products does not exist.',
      })
    }
  } catch (error) {
    throw Error('bad request')
  }
}
const show = async (req: Request, res: Response) => {
  try {
    const productData = await product.show(req.params.id as unknown as number)
    if (productData) {
      res.json({
        status: 'succeed',
        data: productData,
        message: 'product is in stock',
      })
    } else {
      res.status(404).json({
        message:
          'The product you are looking for does not exist try with valid id product',
      })
    }
  } catch (error) {
    throw Error('The product does not exist.')
  }
}
const create = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body

    if (!name || !price) {
      return res.status(400).send('Error missing name or price')
    }
    const productData = { name, price }
    const newProduct = await product.create(productData)
    res.json({
      status: '200',
      New_Product: newProduct,
      message: 'product created successfully',
    })
  } catch (error) {
    throw Error(`sorry cant create product ${error}`)
  }
}

const products_routes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

export default products_routes
