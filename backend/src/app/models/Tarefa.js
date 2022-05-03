
module.exports = (sequelize, DataTypes) => {
  const Tarefa = sequelize.define('tarefa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
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
    realizada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  Tarefa.associate = function(models) {
    Tarefa.belongsTo(models.paciente, { foreignKey: 'paciente_id', as: 'paciente' });
    Tarefa.belongsTo(models.psicologo, { foreignKey: 'psicologo_id', as: 'psicologo' });
  }
  
  return Tarefa;
};