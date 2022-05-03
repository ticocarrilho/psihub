const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const PsicologoController = require('../app/controllers/PsicologoController');

const {
  psicologoRequiredFieldsPost,
  psicologoRequiredFieldsPatch,
  returnValidation,
} = require('./validations');
const imageUploadMiddleware = require('../middlewares/imageUploadMiddleware');

routes.get('/', PsicologoController.index);
routes.get('/:id', auth, PsicologoController.show);
routes.post(
  '/',
  // psicologoRequiredFieldsPost,
  // returnValidation,
  imageUploadMiddleware.upload,
  PsicologoController.store
);
routes.patch(
  '/:id',
  auth,
  psicologoRequiredFieldsPatch,
  returnValidation,
  PsicologoController.update
);
routes.delete('/:id', auth, PsicologoController.delete);

module.exports = routes;