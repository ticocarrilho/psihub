const fs = require('fs');
const { psicologo: Psicologo, usuario: Usuario } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { page } = req.headers;
      const currentPage = (Number(page) - 1) * 10;

      let psicologos = await Psicologo.findAndCountAll({
        limit: 10,
        offset: currentPage,
        attributes: ['id', 'crp', 'estado', 'biografia', 'precoSessao', 'formacoes', 'comecoAtendimento', 'finalAtendimento', 'imagem'],
        include: [{
          model: Usuario,
          attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
        }],
        raw: true,
        nest: true
      });

      psicologos.rows = psicologos.rows.map((psicologo) => {
        let imagem = psicologo.imagem;
        
        if(fs.existsSync(psicologo.imagem)) {
          imagem = fs.readFileSync(psicologo.imagem);
        }

        return {
          ...psicologo,
          imagem
        }
      })
      
      return res.json(psicologos); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] }); 
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const psicologo = await Psicologo.findByPk(id, {
        attributes: ['id', 'crp', 'estado', 'biografia', 'precoSessao', 'formacoes', 'comecoAtendimento', 'finalAtendimento'],
        include: [{
          model: Usuario,
          attributes: ['id', 'nome', 'dataNascimento', 'email', 'telefone']
        }]
      });
      
      if (!psicologo) {
        return res.status(404).json({ error: [{ msg: 'Psicologo não encontrado.' }] });
      }
      
      return res.json(psicologo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { nome, email, senha, telefone, crp, estado, dataNascimento, biografia, precoSessao, formacoes, comecoAtendimento, finalAtendimento } = req.body;
      const emailInUse = await Usuario.findOne({ where: { email } });
      if (emailInUse) {
        return res
          .status(400)
          .json({ error: [{ msg: 'E-mail já cadastrado.', param: 'email' }] });
      }
      
      const psicologo = await Psicologo.create({ 
        usuario: {
          nome, email, senha, telefone, dataNascimento
        },
        crp, 
        estado,
        biografia,
        precoSessao,
        formacoes: JSON.parse(formacoes),
        comecoAtendimento,
        finalAtendimento,
        imagem: req.file.path
      }, {
        include: [Usuario]
      });
      const token = psicologo.usuario.generateToken();
      
      return res.status(201).json({ token, userType: 'psicologo', userName: psicologo.usuario.nome });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, telefone, crp, estado, dataNascimento, precoSessao, comecoAtendimento, finalAtendimento } = req.body;
      const emailInUse = await Usuario.findOne({ where: { email } });

      if (emailInUse) {
        return res
          .status(400)
          .json({ error: [{ msg: 'E-mail já cadastrado.', param: 'email' }] });
      }
      
      const psicologo = await Psicologo.findOne({
        where: { id },
        include: [Usuario]
      });
      
      if (!psicologo) {
        return res.status(404).json({ error: [{ msg: 'Psicologo não encontrado.' }] });
      }
      
      await psicologo.update({ crp, estado });
      await psicologo.usuario.update({ nome, email, senha, telefone, dataNascimento, precoSessao, comecoAtendimento, finalAtendimento })
      return res.json({ message: 'Psicologo editado com sucesso.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {//quebrado cascade
    try {
      const { id } = req.params;
      const psicologo = await Psicologo.findOne({ where: { id } });

      if (!psicologo) {
        return res.status(404).json({ error: [{ msg: 'Psicologo não encontrado.' }] });
      }
      
      await psicologo.destroy();
      return res.json({ message: 'Psicologo deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};