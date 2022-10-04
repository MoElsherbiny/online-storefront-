import { Users, Store } from '../../models/users'

const users = new Store()
const user: Users = {
  firstname: 'Mohamed2',
  lastname: 'Elsherbiny',
  password: 'hello-world',
}
describe('Testing Users', () => {
  it('should have a index method', () => {
    expect(users.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(users.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(users.create).toBeDefined()
  })
  it('should have a Authenticate method', () => {
    expect(users.authenticate).toBeDefined()
  })
})
let TestingUsers: Users
describe('Testing Models : Users', async () => {
  it('create user', async () => {
    TestingUsers = await users.create(user)
    user.id = TestingUsers.id
    expect({
      firstname: TestingUsers.firstname,
      lastname: TestingUsers.lastname,
    }).toEqual({
      firstname: user.firstname,
      lastname: user.lastname,
    })
  })
})
it('index all users', async () => {
  const ShowUsers = await users.index()
  expect(ShowUsers).toContain(TestingUsers)
})
it('show the user by id', async () => {
  const UserById = await users.show(TestingUsers.id as number)
  expect(UserById).toEqual(TestingUsers)
})

it('Testing Authenticate', async () => {
  const Exist = await users.authenticate(
    user.id as number,
    user.password as string
  )
  expect(Exist?.id).toBe(user.id)
})
