import client from '../database'

export type order = {
  id?: number
  user_id: number
  product_id: []
  quantity: number
  status: string
}

export class orders {
  async index(): Promise<order[]> {
    try {
      const connection = await client.connect()
      const sql =
        'SELECT * FROM products INNER  JOIN orders_products ON products.id=orders_products.id'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw Error(`cant show order ${error}`)
    }
  }
  async show(id: number): Promise<order> {
    try {
      const connection = await client.connect()
      const sql = 'SElECT * FROM orders WHERE id =($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw Error(`unable to show order ${error}`)
    }
  }

  async create(order: order): Promise<order> {
    try {
      const connection = await client.connect()
      const sql =
        'INSERT INTO orders(status,user_id) VALUES ($1,$2) RETURNING *'
      const result = await connection.query(sql, [order.status, order.user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw Error(`unable to create order try agin please ${error}`)
    }
  }

  async addProduct(
    quantity?: number,
    orderId?: string,
    productId?: number
  ): Promise<order> {
    try {
      const sql =
        'INSERT INTO orders_products(quantity,order_id,product_id) VALUES ($1, $2, $3) RETURNING *'
      const connection = await client.connect()
      const result = await connection.query(sql, [quantity, orderId, productId])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error(
        'Could not add product productId to order orderId check out your valid data'
      )
    }
  }
}
