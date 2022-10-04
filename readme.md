# Project Name

Storefront Backend

# Description

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## Installation

To install all of the packages in a pack.json,
use
npm install

## Usage

npm run dev to run the server with nodemon package
npm run build to configure Ts with JavaScript
npm run format to check prettier
npm run lint:fix to check for errors and, if possible, fix them
npm run migrate-up
try testing using one of the fantastic packages, Jasmine.
npm run test

## Migrations

create your dev postgres database
and your test postgres database
here is the way to do that in command line or terminal
CREATE DATABASE ..dev..;
CREATE DATABASE ..test..;

Then the Migrations work
use
npm run migrate-up
or
db-migrate up

## try Endpoint FOR users

start with /// app.post('/users', create) create new user with verifyAuthToken to use in others methods
app.get('/users', verifyAuthToken, index)show all users
app.get('/users/id', verifyAuthToken, show) get user by id

app.post('/users/login', authenticate)

## try Endpoint FOR products

app.get('/products', index) show all products
app.get('/products/:id', show) get product by id
app.post('/products', verifyAuthToken, create) create new product

## try Endpoint FOR orders

app.get('/orders', index) show all orders
app.get('/orders/:id', show) get order by id
app.post('/orders', create) create new order
app.post('/orders/:id/products', verifyAuthToken, addProduct) add product to order

# Usage packages

```bash
npm install prettier
npm install ESLint
npm install helmet
npm install jasmine
npm install super-test
npm install morgan
npm install pg
npm install jsonwebtoken
npm install nodemon
```

# Road map

I'd like to make this project more accessible to users on store shelves in case I need to expand on the concept. so that i added some security packages like morgan,helmet

## Authors and acknowledgment

I admire Udacity's educational efforts in achieving this level of accomplishment, and I am proud to be a member of the Udacity team.

I also appreciate your interest in my project.

# Support

If you require further assistance, please contact me on Linkedin at https://www.linkedin.com/in/moelsherbiny

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License

[Udacity]
# online-storefront-
