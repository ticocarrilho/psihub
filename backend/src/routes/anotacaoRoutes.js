const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const AnotacaoController = require('../app/controllers/AnotacaoController');

routes.get('/', auth, AnotacaoController.index);
// routes.get('/:id', auth, ConsultaController.show);
routes.post(
  '/',
  auth,
  AnotacaoController.store
);
// routes.patch(
//   '/:id',
//   auth,
//   ConsultaController.update
// );
routes.delete('/:id', auth, AnotacaoController.delete);

module.exports = routes;