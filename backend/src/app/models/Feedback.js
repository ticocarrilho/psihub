
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('feedbacks', {
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
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });

  Feedback.associate = function(models) {
    Feedback.belongsTo(models.paciente, { foreignKey: 'paciente_id' });
    Feedback.belongsTo(models.psicologo, { foreignKey: 'psicologo_id' });
  }
  
  
  return Feedback;
};