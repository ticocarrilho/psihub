const { Op } = require('sequelize');
const moment = require('moment');
const { usuario: Usuario, psicologo: Psicologo, consultas: Consulta, paciente: Paciente, contratos: Contrato, anotacoes: Anotacao } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { page, pacienteid: pacienteId } = req.headers;
      let currentPage = '';
      if(page !== undefined) {
        currentPage = (Number(page) - 1) * 10;
      }

      const anotacoes = await Anotacao.findAndCountAll({
        ...(page !== undefined && {
          limit: 10,
          offset: currentPage,
        }),
        where: {
          '$psicologo.user_id$': req.id,
          // '$paciente.id$': pacienteId,
        },
        include: [{
          model: Paciente,
          as: 'paciente',
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }],
          model: Psicologo,
          as: 'psicologo',
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }]
      });
      
      return res.json(anotacoes); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] }); 
    }
  },

  async show(req, res) {
    
  },

  async store(req, res) {
    try {
      const { pacienteId, titulo, descricao } = req.body;
      
      const psicologo = await Psicologo.findOne({
        where: {
          user_id: req.id
        }
      });

      const anotacao = await Anotacao.create({
        paciente_id: pacienteId,
        psicologo_id: psicologo.dataValues.id,
        titulo,
        descricao
      });
      
      return res.status(201).json({ anotacao });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    
  },

  async delete(req, res) {//quebrado cascade
    try {
      const { id } = req.params;
      const anotacao = await Anotacao.findOne({ where: { id } });

      if (!anotacao) {
        return res.status(404).json({ error: [{ msg: 'Anotação não encontrado.' }] });
      }
      
      await anotacao.destroy();
      return res.json({ message: 'Anotação deletada com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

};