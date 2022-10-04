import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
  POSTGRES_HOST,
  DB_NAME,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env
console.log('Environment is: ' + ENV)

const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV === 'dev' ? DB_NAME : POSTGRES_TEST_DB,
})

export default client
