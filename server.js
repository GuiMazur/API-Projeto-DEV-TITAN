const express = require('express');
const app = express();
const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ROUTES

    // USERS

app.route('/users/register').post(UserController.Store)

app.route('/users/login').post(UserController.Login)

    // PRODUCTS

app.route('/products/register').post(ProductController.Store)

app.route('/products').get(ProductController.Login)

// END ROUTES

app.listen(8000, console.log('Ouvindo'))