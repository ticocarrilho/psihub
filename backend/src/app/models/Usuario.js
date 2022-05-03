const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: DataTypes.STRING,
    dataNascimento: DataTypes.DATE,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    senha: DataTypes.STRING,
  }, {
    hooks: {
      beforeSave: async (usuario) => {
        usuario.senha = await bcrypt.hash(usuario.senha, 8);
      },
    },
  });

  Usuario.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: 600,
    });
  };

  Usuario.prototype.checkPassword = function (senha) {
    return bcrypt.compare(senha, this.senha);
  };

  Usuario.associate = function (models) {
    Usuario.hasMany(models.paciente, {
      foreignKey: 'user_id',
      as: 'paciente',
      onDelete: 'CASCADE'
    });
    Usuario.hasMany(models.psicologo, { foreignKey: 'user_id', as: 'psicologo', onDelete: 'CASCADE' });
  };
  
  return Usuario;
};