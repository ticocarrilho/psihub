const express = require('express');
const routes = express.Router();
const UsuarioController = require('../app/controllers/UsuarioController');

routes.post(
  '/',
  UsuarioController.login
);

module.exports = routes;