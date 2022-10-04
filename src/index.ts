import express, { Application, Response, Request } from 'express'
import * as dotenv from 'dotenv'
import users_routes from './handlers/user'
import morgan from 'morgan'
import helmet from 'helmet'
import products_routes from './handlers/products'
import orders_routes from './handlers/orders'

dotenv.config()

const port = process.env.PORT
const host = process.env.HOST

// create an instance server
const app: Application = express()
app.use(express.json())
//logger middle ware
app.use(morgan('common'))
//security for middle ware and (express)
app.use(helmet())

app.get('/', (_req: Request, res: Response) => {
  res.send('welcome to the storefront app')
})

users_routes(app)
products_routes(app)
orders_routes(app)
// start express server

app.listen(port, () => {
  console.log(`Server is starting at ${host}:${port}`)
})

export default app
