## First of all

I wish you a wonderful day and hope you enjoy my project. Many thanks for the excellent learning journey; I want to learn from you as well.

## Users:

| Endpoint             | Request  | Parameters                        | Requires Token | Usage               |
| -------------------- | -------- | --------------------------------- | -------------- | ------------------- |
| **/api/users**       | **GET**  |                                   | **True**       | **show all users**  |
| **/api/users**       | **POST** | **firstname, lastname, password** | **False**      | **Creating User**   |
| **/api/users/:id**   | **GET**  | **id**                            | **True**       | **show user by Id** |
| **/api/users/login** | **POST** | **id, password**                  | **False**      | **login user in**   |

# Products:

| Endpoint              | Request  | Parameters      | Requires Token | Usage                  |
| --------------------- | -------- | --------------- | -------------- | ---------------------- |
| **/api/products**     | **GET**  |                 | **False**      | **show all products**  |
| **/api/products**     | **POST** | **name, price** | **True**       | **Create product**     |
| **/api/products/:id** | **GET**  | **id**          | **False**      | **show product by Id** |

# Orders:

| Endpoint                          | Request  | Parameters              | Requires Token | Usage                       |
| --------------------------------- | -------- | ----------------------- | -------------- | --------------------------- |
| **/api/orders**                   | **GET**  |                         | **False**      | **show all orders**         |
| **/api/orders**                   | **POST** | **status, user_id**     | **True**       | **creating new order**      |
| **/api/orders/:id**               | **GET**  | **id**                  | **False**      | **Load order by Id**        |
| **/api/orders/:orderId/products** | **POST** | **productId, quantity** | **True**       | **adding product to order** |

## User

| Field         | Type             | Special Attributes |
| ------------- | ---------------- | ------------------ |
| **id**        | **SERIAL**       | **PRIMARY Key**    |
| **firstname** | **VARCHAR(60)**  |                    |
| **lastname**  | **VARCHAR(60)**  |                    |
| **password**  | **VARCHAR(250)** |                    |

# Orders

| Field       | Type             | Special Attributes |
| ----------- | ---------------- | ------------------ |
| **id**      | **SERIAL**       | **PRIMARY Key**    |
| **status**  | **VARCHAR(120)** |                    |
| **user_id** | **INT**          | **Foreign Key**    |

# Product

| Field     | Type             | Special Attributes |
| --------- | ---------------- | ------------------ |
| **id**    | **SERIAL**       | **PRIMARY Key**    |
| **name**  | **VARCHAR(150)** |                    |
| **price** | **INT**          |                    |

#### Orders_Products

| Field          | Type       | Special Attributes |
| -------------- | ---------- | ------------------ |
| **id**         | **SERIAL** | **Primary Key**    |
| **quantity**   | **INT**    |                    |
| **order_id**   |            | **Foreign Key**    |
| **product_id** |            | **Foreign Key**    |
