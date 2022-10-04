import client from '../database'

export type product = {
  id?: number
  name: string
  price: number
}

export class products {
  async index(): Promise<product[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw Error(`product is unavailable ${error}`)
    }
  }

  async show(id: number): Promise<product> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw Error(`unable to display product ${error}`)
    }
  }

  async create(product: product): Promise<product> {
    try {
      const connection = await client.connect()
      const sql = 'INSERT INTO products(name,price) VALUES ($1,$2) RETURNING *'
      const result = await connection.query(sql, [product.name, product.price])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw Error(
        `Please try again if you are unable to create a product. ${error}`
      )
    }
  }
}
