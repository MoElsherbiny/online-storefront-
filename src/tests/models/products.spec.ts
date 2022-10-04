import { product, products } from '../../models/products'

const TestProduct = new products()
const productDetails: product = {
  id: 1,
  name: 'watch',
  price: 100,
}

describe('testing product', async () => {
  it('must have a index method ', () => {
    expect(TestProduct.index).toBeDefined
  })

  it('must have show', () => {
    expect(TestProduct.show).toBeDefined
  })
  it('must have create', () => {
    expect(TestProduct.create).toBeDefined
  })
})
describe('Testing create,show,index for products', () => {
  beforeAll(async () => {
    const Test: product = await TestProduct.create(productDetails)
    expect({
      name: Test.name,
      price: Test.price,
    }).toEqual({
      name: productDetails.name,
      price: productDetails.price,
    })
  })
  it('index all products', async () => {
    const result = await TestProduct.index()
    expect(result).toBeTruthy()
  })
  it('show product by id', async () => {
    const result = await TestProduct.show(productDetails.id as number)
    expect(result).toBeTruthy()
  })
})
