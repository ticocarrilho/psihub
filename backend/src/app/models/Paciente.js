
module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('paciente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  });

  Paciente.associate = function(models) {
    Paciente.belongsTo(models.usuario, { foreignKey: 'user_id' });
    Paciente.belongsTo(models.contratos, { foreignKey: 'contrato_id' });
    Paciente.hasMany(models.consultas, { foreignKey: 'paciente_id' });
    Paciente.hasMany(models.tarefa, { foreignKey: 'paciente_id', as: 'tarefa' });
    Paciente.hasMany(models.anotacoes, { foreignKey: 'paciente_id', as: 'anotacao', onDelete: 'CASCADE' });
    Paciente.hasMany(models.feedbacks, { foreignKey: 'paciente_id', as: 'feedbacks' });
  }
  
  return Paciente;
};