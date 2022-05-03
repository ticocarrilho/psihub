const { usuario: Usuario, psicologo: Psicologo, consulta: Consulta, tarefa: Tarefa, paciente: Paciente } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { page } = req.headers;

      let currentPage = '';
      if(page !== undefined) {
        currentPage = (Number(page) - 1) * 10;
      }

      const tarefas = await Tarefa.findAndCountAll({
        ...(page !== undefined && {
          limit: 10,
          offset: currentPage,
        }),
        include: [{
          model: Paciente,
          as: 'paciente',
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }]
      });
      
      return res.json(tarefas); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] }); 
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id, {
        include: [{
          model: Paciente,
          as: 'paciente',
          attributes: ['id', 'user_id'],
          include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
          }]
        }, {
          model: Consulta,
          as: 'consulta_inicio',
        }, {
          model: Consulta,
          as: 'consulta_final',
        }]
      });
      
      if (!tarefa) {
        return res.status(404).json({ error: [{ msg: 'Tarefa não encontrado.' }] });
      }
      
      return res.json(tarefa);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { nome, descricao, pacienteId } = req.body;

      const psicologo = await Psicologo.findOne({
        where: {
          user_id: req.id
        }
      });

      const tarefa = await Tarefa.create({
        nome,
        descricao,
        paciente_id: pacienteId,
        psicologo_id: psicologo.dataValues.id
      });
      
      return res.status(201).json({ tarefa });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, realizada } = req.body;
      const tarefa = await Tarefa.findOne({ where: { id } });

      if (!tarefa) {
        return res
          .status(404)
          .json({ error: [{ msg: 'Tarefa não encontrada.' }] });
      }
      
      await tarefa.update({ ...tarefa, nome, descricao, realizada })
      return res.json({ message: 'Tarefa editada com sucesso.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {//quebrado cascade
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findOne({ where: { id } });

      if (!tarefa) {
        return res.status(404).json({ error: [{ msg: 'Tarefa não encontrado.' }] });
      }
      
      await tarefa.destroy();
      return res.json({ message: 'Tarefa deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

};