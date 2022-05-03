const { usuario: Usuario, psicologo: Psicologo, feedbacks: Feedback, paciente: Paciente } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const feedbacks = await Feedback.findAndCountAll({
        where: {
          '$psicologo.user_id$': req.id
        },
        include: [{
          model: Psicologo,
          as: 'psicologo',
          attributes: ['id', 'crp', 'estado'],
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }, {
          model: Paciente,
          as: 'paciente',
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }]
      });
      
      return res.json(feedbacks); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] }); 
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const feedback = await Feedback.findByPk(id, {
        include: [{
          model: Psicologo,
          as: 'psicologo',
          attributes: ['id', 'crp', 'estado'],
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }, {
          model: Paciente,
          as: 'paciente',
          attributes: ['id', 'user_id'],
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }]
      });
      
      if (!feedback) {
        return res.status(404).json({ error: [{ msg: 'Feedback não encontrado.' }] });
      }
      
      return res.json(feedback);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { pacienteId, psicologoId, descricao } = req.body;

      const feedback = await Feedback.create({
        paciente_id: pacienteId,
        psicologo_id: psicologoId,
        descricao
      });
      
      return res.status(201).json({ feedback });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { pacienteId, psicologoId, descricao } = req.body;
      const feedback = await Feedback.findOne({ where: { id } });

      if (!feedback) {
        return res
          .status(404)
          .json({ error: [{ msg: 'Feedback não encontrado.' }] });
      }
      
      await feedback.update({ ...feedback, pacienteId, psicologoId, descricao })
      return res.json({ message: 'Feedback editado com sucesso.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {//quebrado cascade
    try {
      const { id } = req.params;
      const feedback = await Feedback.findOne({ where: { id } });

      if (!feedback) {
        return res.status(404).json({ error: [{ msg: 'Feedback não encontrado.' }] });
      }
      
      await feedback.destroy();
      return res.json({ message: 'Feedback deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

};