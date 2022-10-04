import { Users, Store } from '../../models/users'
import { order, orders } from '../../models/orders'
import { products, product } from '../../models/products'

const users = new Store()
const user: Users = {
  firstname: 'udacity',
  lastname: 'user',
  password: 'test-user',
}

const TestOrders = new orders()
let OrderData: order = {
  status: 'great',
  user_id: 1,
  quantity: 2,
  product_id: [],
}
const TestProducts = new products()
let NewProd: product = {
  name: 'laptop',
  price: 10000,
}
let CreateOrder: order
let newProduct: product
describe('testing orders', async () => {
  it('must have a index method ', () => {
    expect(TestOrders.index).toBeDefined
  })

  it('must have show', () => {
    expect(TestOrders.show).toBeDefined
  })
  it('must have create', () => {
    expect(TestOrders.create).toBeDefined
  })
  it('must add products to orders', () => {
    expect(TestOrders.addProduct).toBeDefined
  })
})
describe('Testing create order', () => {
  beforeAll(async () => {
    const CreateUser = await users.create(user)
    if (CreateUser.id) {
      OrderData.user_id = CreateUser.id
      user.id = CreateUser.id
    }
    newProduct = await TestProducts.create(NewProd)
    if (newProduct.id) {
      NewProd.id = newProduct.id
    }
    CreateOrder = await TestOrders.create(OrderData)
    if (CreateOrder.id) OrderData.id = CreateOrder.id
  })
  it('must get order by id', async () => {
    const GetOrder = await TestOrders.show(OrderData.id as number)
    expect(GetOrder.id).toEqual(OrderData.id)
    console.log(GetOrder.id)
  })

  it('Testing addProduct to orders ', async () => {
    await TestOrders.addProduct(
      OrderData.quantity,
      OrderData.id as unknown as string,
      NewProd.id
    )

    expect({
      quantity: CreateOrder.quantity,
      productId: newProduct.id,
    }).toEqual({
      quantity: CreateOrder.quantity,
      productId: newProduct.id,
    })
  })
})
