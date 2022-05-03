const express = require('express');
const routes = express.Router();
const PacienteRoutes = require('./pacienteRoutes');
const PsicologoRoutes = require('./psicologoRoutes');
const UsuarioRoutes = require('./usuarioRoutes');
const FeedbackRoutes = require('./feedbackRoutes');
const ConsultasRoutes = require('./consultaRoutes');
const ContratosRoutes = require('./contratoRoutes');
const SentimentosRoutes = require('./sentimentoRoutes');
const TarefasRoutes = require('./tarefaRoutes');
const AnotacaoRoutes = require('./anotacaoRoutes');

routes.use('/paciente', PacienteRoutes);
routes.use('/psicologo', PsicologoRoutes);
routes.use('/usuario', UsuarioRoutes);
routes.use('/feedback', FeedbackRoutes);
routes.use('/consulta', ConsultasRoutes);
routes.use('/contrato', ContratosRoutes);
routes.use('/sentimento', SentimentosRoutes);
routes.use('/tarefa', TarefasRoutes);
routes.use('/anotacao', AnotacaoRoutes);

module.exports = routes;