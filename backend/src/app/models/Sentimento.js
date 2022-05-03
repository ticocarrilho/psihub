
module.exports = (sequelize, DataTypes) => {
  const Sentimento = sequelize.define('sentimentos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      references: 'paciente',
      referencesKey: 'id'
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Sentimento.associate = function(models) {
    Sentimento.belongsTo(models.paciente, { foreignKey: 'paciente_id' });
  }
  
  
  return Sentimento;
};