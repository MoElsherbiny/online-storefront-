import app from '../../index'
import supertest from 'supertest'
import { Store, Users } from '../../models/users'

const request = supertest(app)
const users = new Store()
const user: Users = {
  firstname: 'udacity',
  lastname: 'test-2',
  password: 'pass12345',
}
let TokenSecretKey: string
let UserId: number | unknown
describe('Testing Users Endpoint', () => {
  it('Testing Endpoint creating new user must return new User ', async () => {
    const createUser = await request.post('/users').send(user)
    expect(createUser.status).toEqual(200)
  })

  it('Testing the authorization endpoint with valid user', async () => {
    const create = await users.create(user)
    UserId = user.id

    const authorization = await request
      .post('/users/login')
      .send({ id: create.id, password: user.password })
    TokenSecretKey = authorization.body.SecretToken.GenerateToken
    expect(authorization.status).toEqual(200)
  })
  it('Testing Endpoint to show user by id', async () => {
    await request
      .get(`/users/${UserId}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${TokenSecretKey}`)
    expect(200)
  })
  it('Testing show all users', async () => {
    await request
      .get('/users')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${TokenSecretKey}`)
      .expect(200)
  })
  it('Expect an error if you use endpoint /users without adding TokenSecretKey', async () => {
    await request.get('/users').expect(500)
  })
  it('Expect an error if you use endpoint /users/:id to show user without adding TokenSecretKey', async () => {
    await request.get(`/users/${UserId}`).expect(404)
  })
  it('Expect an error if you use endpoint /users/login with wrong id, password data', async () => {
    const create = await users.create(user)
    await request
      .post('/users/login')
      .send({ id: create.id, password: create.password })
      .expect(401)
  })
})
