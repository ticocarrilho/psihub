const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const ConsultaController = require('../app/controllers/ConsultaController');

const {
  userRequiredFieldsPatch,
  userRequiredFieldsPost,
  returnValidation,
} = require('./validations');

routes.get('/', auth, ConsultaController.index);
routes.get('/:id', auth, ConsultaController.show);
routes.post(
  '/',
  auth,
  ConsultaController.store
);
routes.patch(
  '/:id',
  auth,
  ConsultaController.update
);
routes.delete('/:id', auth, ConsultaController.delete);

module.exports = routes;