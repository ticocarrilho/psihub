const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const FeedbackController = require('../app/controllers/FeedbackController');

const {
  userRequiredFieldsPatch,
  userRequiredFieldsPost,
  returnValidation,
} = require('./validations');

routes.get('/', auth, FeedbackController.index);
routes.get('/:id', auth, FeedbackController.show);
routes.post(
  '/',
  auth,
  FeedbackController.store
);
routes.patch(
  '/:id',
  auth,
  FeedbackController.update
);
routes.delete('/:id', auth, FeedbackController.delete);

module.exports = routes;