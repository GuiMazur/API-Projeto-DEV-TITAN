const express = require('express');
const app = express();
const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')
const CartController = require('./controllers/CartController')

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS');
  next();
});

// ROUTES

    // USERS

  app.route('/users/register').post(UserController.Store)

  app.route('/users/login').post(UserController.Login)

    // PRODUCTS

  app.route('/products/register').post(ProductController.Store)

  app.route('/products/update/:id').put(ProductController.Update)
  
  app.route('/products/delete/:id').delete(ProductController.Delete)

  app.route('/products').get(ProductController.Index)

  app.route('/products/:id').get(ProductController.Show)

    // CART

  app.route('/cart/register/:id').post(CartController.Store)
  
  app.route('/cart/buy/:id').patch(CartController.Buy)

  app.route('/cart/delete/:user_id/:product_id').delete(CartController.Delete)

  app.route('/cart/:id').get(CartController.Index)

// END ROUTES

app.listen(8000, console.log('Ouvindo'))