## Description

This is the simple application that allows you to
- Perform CRUD action on Product
- Perform CRUD action on User

To run the application, please run following commands:

## Installation

```bash
# Install dependency
$ yarn install

# Run the application
$ yarn start:dev
```

## Quick Start

The CRUD actions for both users and products originating from a single endpoint as following steps:

1.  Open your preferred GraphQL client tool.
2.  Set the endpoint URL to http://localhost:3000/graphql
3.  Use the following GraphQL queries and mutations to interact with the API

### Insert data to Users

To create a user, please use the following mutation:

```bash
# With Order
mutation {
  createUser (createUserInput: {
    name: "First User", 
    email: "first@user.com"
    age: 50
    order: [{ id: 1 }]
  }) {
    id
    name
    email
    age
  }
}

# Without Order
mutation {
  createUser (createUserInput: {
    name: "First User", 
    email: "first@user.com"
    age: 50
  }) {
    id
    name
    email
    age
  }
}
```
The order id refers to the primary key generated during Product creation. Please make sure that the product is created before creating user with order.

Name, email and age are required for user creation. 

### Insert data to Products

To create a product, please use the following mutation:

```bash
mutation {
  createProduct (createProductInput: {
    name: "First Product",
    price: 100
  }) {
    id,
    name,
    price
  }
}
```

Name and price are required for product creation.

### Query User with Products Information

To query user with product information, please use following query:

Query all users:
```
query {
	users {
    id
    name
    email
    age
    order {
      id
      name
      price
    }
  }
}
```

Querying specific user with user id:
```
query {
	user(id:$id) {
    id
    name
    email
    age
    order {
      id
      name
      price
    }
  }
}
```