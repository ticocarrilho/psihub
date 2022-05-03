const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const SentimentoController = require('../app/controllers/SentimentoController');

const {
  userRequiredFieldsPatch,
  userRequiredFieldsPost,
  returnValidation,
} = require('./validations');

routes.get('/', auth, SentimentoController.index);
routes.get('/:id', auth, SentimentoController.show);
routes.post(
  '/',
  auth,
  SentimentoController.store
);
routes.patch(
  '/:id',
  auth,
  SentimentoController.update
);
routes.delete('/:id', auth, SentimentoController.delete);

module.exports = routes;