const { usuario: Usuario, paciente: Paciente, psicologo: Psicologo, contratos: Contrato } = require('../app/models');
const jwt = require('jsonwebtoken');

module.exports = {
  async auth(req, res, next) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');

      if(!token) {
        throw '';
      }
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw err;
        }
        req.id = decoded.id;
      });
      
      next()
    } catch (error) {
      return res.status(401).json({
        error: 'Não autorizado!',
      });
    } 
  },
  async authPsicologoDoPaciente(req, res, next) {
    try {
      const { id } = req.params;
      const token = req.header('Authorization').replace('Bearer ', '');

      if(!token) {
        throw '';
      }
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw err;
        }
        req.id = decoded.id;
      });

      const paciente = await Paciente.findOne({
        where: {
          '$contrato.psicologo.user_id$': req.id,
          user_id: id
        },
        include: [{
          model: Usuario,
        }, {
          model: Contrato,
          as: 'contrato',
          include: [{
            model: Psicologo,
            as: 'psicologo'
          }]
        }]
      });

      if(paciente) {
        return next();
      }

      return res.status(401).json({
        error: 'Não autorizado!',
      });
    } catch (error) {
      return res.status(401).json({
        error: 'Não autorizado!',
      });
    } 
  },
  async authPaciente(req, res, next) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');

      if(!token) {
        throw '';
      }
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw err;
        }
        req.id = decoded.id;
      });

      const paciente = await Paciente.findOne({
        where: {
          user_id: req.id
        }
      });

      if(paciente) {
        return next();
      }

      return res.status(401).json({
        error: 'Não autorizado!',
      });
    } catch (error) {
      return res.status(401).json({
        error: 'Não autorizado!',
      });
    } 
  },
};