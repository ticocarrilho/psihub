const { usuario: Usuario, paciente: Paciente, psicologo: Psicologo, contratos: Contrato } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const psicologo = await Psicologo.findOne({
        where: {
          user_id: req.id
        }
      });

      const pacientes = await Paciente.findAndCountAll({
        attributes: ['id'],
        where: {
          '$contrato.psicologo_id$': psicologo.dataValues.id,
        },
        include: [{
          model: Usuario,
          attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
        }, {
          model: Contrato,
          include: [{
            model: Psicologo,
            as: 'psicologo'
          }]
        }]
      });
      
      return res.json(pacientes); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] }); 
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findByPk(id, {
        attributes: ['id'],
        include: [{
          model: Usuario,
          attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
        }, {
          model: Contrato,
          include: [{
            model: Psicologo,
            as: 'psicologo'
          }]
        }]
      });
      
      if (!paciente) {
        return res.status(404).json({ error: [{ msg: 'Paciente não encontrado.' }] });
      }
      
      return res.json(paciente);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async showMe(req, res) {
    try {
      const paciente = await Paciente.findOne({
        where: {
          user_id: req.id
        },
        attributes: ['id'],
        include: [{
          model: Usuario,
          attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
        }, {
          model: Contrato,
          include: [{
            model: Psicologo,
            as: 'psicologo'
          }]
        }]
      });
      
      if (!paciente) {
        return res.status(404).json({ error: [{ msg: 'Paciente não encontrado.' }] });
      }
      
      return res.json(paciente);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { nome, email, senha, telefone, dataNascimento } = req.body;
      const emailInUse = await Usuario.findOne({ where: { email } });

      if (emailInUse) {
        return res
          .status(400)
          .json({ error: [{ msg: 'E-mail já cadastrado.', param: 'email' }] });
      }
      
      const paciente = await Paciente.create({
        usuario: {
          nome, email, senha, telefone, dataNascimento
        },
      }, {
        include: [Usuario]
      });
      const token = paciente.usuario.generateToken();
      
      return res.status(201).json({ token, userType: 'paciente', userName: paciente.usuario.nome });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, telefone, dataNascimento } = req.body;
      const emailInUse = await Usuario.findOne({ where: { email } });

      if (emailInUse) {
        return res
          .status(400)
          .json({ error: [{ msg: 'E-mail já cadastrado.', param: 'email' }] });
      }
      
      const paciente = await Paciente.findOne({
        where: { id },
        include: [Usuario]
      });
      
      if (!paciente) {
        return res.status(404).json({ error: [{ msg: 'Paciente não encontrado.' }] });
      }
      
      await paciente.usuario.update({ nome, email, senha, telefone, dataNascimento })
      return res.json({ message: 'Paciente editado com sucesso.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {//quebrado cascade
    try {
      const { id } = req.params;
      const paciente = await Paciente.findOne({ where: { id } });

      if (!paciente) {
        return res.status(404).json({ error: [{ msg: 'Paciente não encontrado.' }] });
      }
      
      await paciente.destroy();
      return res.json({ message: 'Paciente deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};