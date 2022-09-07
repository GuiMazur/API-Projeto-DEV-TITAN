const express = require('express');
const app = express();
const UserController = require('./controllers/UserController')

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.route('/users/register').post(UserController.Store)

app.route('/users/login').post(UserController.Login)

app.listen(8000, console.log('Ouvindo'))