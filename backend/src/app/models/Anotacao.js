
module.exports = (sequelize, DataTypes) => {
  const Consulta = sequelize.define('anotacoes', {
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
    psicologo_id: {
      type: DataTypes.INTEGER,
      references: 'psicologo',
      referencesKey: 'id'
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });

  Consulta.associate = function(models) {
    Consulta.belongsTo(models.paciente, { foreignKey: 'paciente_id', as: 'paciente' });
    Consulta.belongsTo(models.psicologo, { foreignKey: 'psicologo_id', as: 'psicologo' });
  }
  
  return Consulta;
};