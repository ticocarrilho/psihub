const { psicologo: Psicologo, paciente: Paciente, usuario: Usuario } = require('../models');

module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({
        where: { email },
        include: [{
          model: Psicologo,
          as: 'psicologo'
        }, {
          model: Paciente,
          as: 'paciente'
        }]
      });
      
      if (!usuario) {
        return res.status(401).json({
          error: [{ msg: 'E-mail ou senha incorretos.', param: 'wrongEmailOrPwd' }],
        });
      }

      const validPassword = await usuario.checkPassword(senha);

      if (!validPassword) {
        return res.status(401).json({
          error: [{ msg: 'E-mail ou senha incorretos.', param: 'wrongEmailOrPwd' }],
        });
      }

      let userType = usuario.paciente.length > 0 ? 'paciente' : 'psicologo';

      const token = usuario.generateToken();
      return res.status(200).json({ token, userType, userName: usuario.nome });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};