const { usuario: Usuario, psicologo: Psicologo, contratos: Contrato, paciente: Paciente } = require('../models');

module.exports = {
  async index(req, res) {
    
  },

  async show(req, res) {
    
  },

  async store(req, res) {
    try {
      const { pacienteId, inicioContrato, finalContrato, precoSessao } = req.body;
      
      const psicologo = await Psicologo.findOne({
        where: {
          user_id: req.id
        }
      });

      const contrato = await Contrato.create({
        psicologo_id: psicologo.dataValues.id,
        inicioContrato,
        finalContrato,
        precoSessao,
      });

      const paciente = await Paciente.findByPk(pacienteId);

      if (!paciente) {
        return res.status(404).json({
          error: [{ msg: 'Paciente não encontrado.' }],
        });
      }

      await paciente.setContrato(contrato);
      
      return res.status(201).json({ contrato });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    
  },

  async delete(req, res) {//quebrado cascade
    
  },

};