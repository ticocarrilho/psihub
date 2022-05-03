const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const TarefaController = require('../app/controllers/TarefaController');

const {
  userRequiredFieldsPatch,
  userRequiredFieldsPost,
  returnValidation,
} = require('./validations');

routes.get('/', auth, TarefaController.index);
routes.get('/:id', auth, TarefaController.show);
routes.post(
  '/',
  auth,
  TarefaController.store
);
routes.patch(
  '/:id',
  auth,
  TarefaController.update
);
routes.delete('/:id', auth, TarefaController.delete);


module.exports = routes;