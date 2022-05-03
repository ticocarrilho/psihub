const { usuario: Usuario, sentimentos: Sentimento, paciente: Paciente } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const sentimentos = await Sentimento.findAll({
        include: [, {
          model: Paciente,
          as: 'paciente',
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }]
      });
      
      return res.json(sentimentos); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] }); 
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const sentimento = await Sentimento.findByPk(id, {
        include: [{
          model: Paciente,
          as: 'paciente',
          attributes: ['id', 'user_id'],
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }]
      });
      
      if (!sentimento) {
        return res.status(404).json({ error: [{ msg: 'Sentimento não encontrado.' }] });
      }
      
      return res.json(sentimento);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { pacienteId, tipo, descricao } = req.body;

      const sentimento = await Sentimento.create({
        paciente_id: pacienteId,
        tipo,
        descricao
      });
      
      return res.status(201).json({ sentimento });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { pacienteId, tipo, descricao } = req.body;
      const sentimento = await Sentimento.findOne({ where: { id } });

      if (!sentimento) {
        return res
          .status(404)
          .json({ error: [{ msg: 'Sentimento não encontrado.' }] });
      }
      
      await sentimento.update({ ...sentimento, pacienteId, sentimento, descricao })
      return res.json({ message: 'Sentimento editado com sucesso.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {//quebrado cascade
    try {
      const { id } = req.params;
      const sentimento = await Sentimento.findOne({ where: { id } });

      if (!sentimento) {
        return res.status(404).json({ error: [{ msg: 'Sentimento não encontrado.' }] });
      }
      
      await sentimento.destroy();
      return res.json({ message: 'Sentimento deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

};