import client from '../database'
import bcrypt from 'bcrypt'

const { PEPPER, SALT_ROUNDS } = process.env

export type Users = {
  id?: number
  firstname?: string
  lastname?: string
  password: string
}

export class Store {
  async index(): Promise<Users[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT id, firstname,lastname, password FROM users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Data cannot be obtained. ${error}`)
    }
  }

  async show(id: number): Promise<Users> {
    try {
      const sql =
        'SELECT id,firstname,lastname,password FROM users WHERE id =($1)'
      const connection = await client.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`unable to locate user ${error}`)
    }
  }

  async create(user: Users): Promise<Users> {
    try {
      const sql =
        'INSERT INTO users (firstname,lastname,password) VALUES ($1,$2,$3) RETURNING id ,firstname, lastname ,password '
      const connection = await client.connect()
      const hash = bcrypt.hashSync(user.password + PEPPER, Number(SALT_ROUNDS))
      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        hash,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`user cannot be created ${error}`)
    }
  }
  async authenticate(id: number, password: string): Promise<Users | null> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1) '
      const result = await connection.query(sql, [id])

      const user = result.rows[0]
      console.log(user)
      const CorrectPass = bcrypt.compareSync(password + PEPPER, user.password)
      if (CorrectPass) {
        return user
      }

      connection.release()
      return null
    } catch (error) {
      throw new Error(
        `check your correct id and password and try again ${error}`
      )
    }
  }
}
