const express = require('express');
const routes = express.Router();
const multer = require('multer');
const { auth, authPsicologoDoPaciente, authPaciente } = require('../middlewares/authMiddleware');
const PacienteController = require('../app/controllers/PacienteController');

const {
  userRequiredFieldsPatch,
  userRequiredFieldsPost,
  returnValidation,
} = require('./validations');

routes.get('/', auth, PacienteController.index);
routes.get('/info/:id', authPsicologoDoPaciente, PacienteController.show);
routes.get('/me', authPaciente, PacienteController.showMe);
routes.post(
  '/',
  multer().none(),
  PacienteController.store
);
routes.patch(
  '/:id',
  auth,
  PacienteController.update
);
routes.delete('/:id', auth, PacienteController.delete);

module.exports = routes;