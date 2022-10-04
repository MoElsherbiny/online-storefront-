import app from '../../index'
import supertest from 'supertest'
import { order } from '../../models/orders'
import { Store, Users } from '../../models/users'

const OrderData: order = {
  status: 'great',
  user_id: 100,
  quantity: 2,
  product_id: [],
}
const users = new Store()
const user: Users = {
  firstname: 'udacity-3',
  lastname: 'test-3',
  password: 'pass12345',
}
let TokenSecretKey: string

const request = supertest(app)

describe('Testing Order Endpoint', () => {
  it('Testing show all orders Endpoint', async () => {
    await request.get('/orders').expect(200)
  })
  it('Testing show Order by Id Endpoint ', async () => {
    await request.get('/orders/1').expect(200)
  })
  it('Testing create new Order Endpoint ', async () => {
    const create = await users.create(user)
    const authorization = await request
      .post('/users/login')
      .send({ id: create.id, password: user.password })
    TokenSecretKey = authorization.body.SecretToken.GenerateToken
    await request
      .post('/orders')
      .send({
        user_id: OrderData.user_id,
        status: OrderData.status,
      })
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${TokenSecretKey}`)
    expect(200)
  })
  it('Testing add Product in order', async () => {
    await request
      .post(`/orders/${OrderData.id}/products`)
      .send({
        quantity: OrderData.quantity,
        orderId: OrderData.id,
        productId: OrderData.product_id,
      })
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${TokenSecretKey}`)
    expect(200)
  })
  it('Expect an error if you use endpoint  [post] /orders without adding TokenSecretKey', async () => {
    await request
      .post('/orders')
      .send({
        user_id: OrderData.user_id,
        status: OrderData.status,
      })
      .expect(400)
  })
  it(' Expect an error if you use endpoint /orders/:id/products add Product in order without adding TokenSecretKey  ', async () => {
    await request
      .post(`/orders/${OrderData.id}/products`)
      .send({
        quantity: OrderData.quantity,
        orderId: OrderData.id,
        productId: OrderData.product_id,
      })
      .expect(500)
  })
})
