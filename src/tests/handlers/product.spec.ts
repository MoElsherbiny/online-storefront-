import app from '../../index'
import supertest from 'supertest'
import { product, products } from '../../models/products'

import { Store, Users } from '../../models/users'

let TokenSecretKey: string

const request = supertest(app)
const TestProduct = new products()
const newPro: product = {
  name: 'apple-watch',
  price: 10000,
}
const users = new Store()
const user: Users = {
  firstname: 'udacity-3',
  lastname: 'test-3',
  password: 'pass12345',
}

describe('Testing products Endpoint', () => {
  it('Testing Endpoint To show Products', async () => {
    await request.get('/products').expect(200)
  })
  it('Testing Endpoint To get Products by id', async () => {
    const createProduct = await TestProduct.create(newPro)
    const productId = createProduct.id
    await request.get(`/products/${productId}`).expect(200)
  })
  it('Testing EndPoint To create Product', async () => {
    const create = await users.create(user)
    const authorization = await request
      .post('/users/login')
      .send({ id: create.id, password: user.password })
    TokenSecretKey = authorization.body.SecretToken.GenerateToken

    await request
      .post('/products')
      .send({ id: create.id, password: user.password })
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${TokenSecretKey}`)
    expect(200)
  })
  it('Expect an error if you use endpoint /products/id with wrong product id', async () => {
    await request.get('/products/100').expect(404)
  })
  it('Expect an error if you use endpoint  [post] /products without adding TokenSecretKey ', async () => {
    const create = await users.create(user)
    await request
      .post('/products')
      .send({ id: create.id, password: user.password })
      .expect(500)
  })
})
