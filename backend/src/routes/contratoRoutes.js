const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const ContratoController = require('../app/controllers/ContratoController');

// routes.get('/', auth, ContratoController.index);
// routes.get('/:id', auth, ConsultaController.show);
routes.post(
  '/',
  auth,
  ContratoController.store
);
// routes.patch(
//   '/:id',
//   auth,
//   ConsultaController.update
// );
// routes.delete('/:id', auth, ConsultaController.delete);

module.exports = routes;