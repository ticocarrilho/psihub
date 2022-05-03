const { Op } = require('sequelize');
const moment = require('moment');
const { usuario: Usuario, psicologo: Psicologo, consultas: Consulta, paciente: Paciente, contratos: Contrato } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { usertype: userType, page, confirmada, psicologoid: psicologoId, historico, orderby } = req.headers;
      const { id: userId } = req;

      let currentPage = '';
      if(page !== undefined) {
        currentPage = (Number(page) - 1) * 10;
      }
      
      const whereUser = {
        ...(psicologoId !== undefined ? {
          id: Number(psicologoId)
        } : {
          user_id: Number(userId)
        })
      };

      let whereConsulta = {
        ...(confirmada !== undefined && {
          psicologoConfirmado: confirmada === 'true' ? true : false,
          pacienteConfirmado: confirmada === 'true' ? true : false,
        }),
        endDate: {
          [historico === 'false' ? Op.gte : Op.lte]: moment().toDate()
        }
      }

      const consultas = await Consulta.findAndCountAll({
        ...(page !== undefined && {
          limit: 10,
          offset: currentPage,
        }),
        where: {
          ...whereConsulta
        },
        order: [[orderby, 'ASC']],
        include: [{
          model: Psicologo,
          as: 'psicologo',
          attributes: ['id', 'crp', 'precoSessao', 'estado', 'comecoAtendimento', 'finalAtendimento'],
          ...((userType === 'psicologo' || psicologoId !== undefined) && { where: whereUser }),
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }, ...(!psicologoId ? [{
          model: Paciente,
          as: 'paciente',
          ...(userType === 'paciente' && { where: whereUser }),
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }, {
            model: Contrato
          }]
        }] : [])]
      });
      
      return res.json(consultas); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] }); 
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const consulta = await Consulta.findByPk(id, {
        include: [{
          model: Psicologo,
          as: 'psicologo',
          attributes: ['id', 'crp', 'estado', 'precoSessao', 'comecoAtendimento', 'finalAtendimento'],
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }, {
            model: Contrato
          }]
        }, {
          model: Paciente,
          as: 'paciente',
          attributes: ['id', 'user_id'],
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }, {
            model: Contrato
          }]
        }]
      });
      
      if (!consulta) {
        return res.status(404).json({ error: [{ msg: 'Consulta não encontrado.' }] });
      }
      
      return res.json(consulta);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { psicologoId, startDate, endDate } = req.body;
      const usuario = await Paciente.findOne({
        where: {
          user_id: req.id
        }
      });

      const consulta = await Consulta.create({
        paciente_id: usuario.dataValues.id,
        psicologo_id: psicologoId,
        startDate,
        endDate,
        pacienteConfirmado: true
      });
      
      return res.status(201).json({ consulta });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      
      const { startDate, endDate, pacienteConfirmado, psicologoConfirmado, reagendada } = req.body;
      const consulta = await Consulta.findOne({ where: { id } });

      if (!consulta) {
        return res
          .status(404)
          .json({ error: [{ msg: 'Consulta não encontrada.' }] });
      }

      await consulta.update({ startDate, endDate, pacienteConfirmado, psicologoConfirmado, reagendada })
      return res.json({ message: 'Consulta editada com sucesso.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {//quebrado cascade
    try {
      const { id } = req.params;
      const consulta = await Consulta.findOne({ where: { id } });

      if (!consulta) {
        return res.status(404).json({ error: [{ msg: 'Consulta não encontrado.' }] });
      }
      
      await consulta.destroy();
      return res.json({ message: 'Consulta deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

};