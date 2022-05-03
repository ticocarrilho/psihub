
module.exports = (sequelize, DataTypes) => {
  const Consulta = sequelize.define('consultas', {
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pacienteConfirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    psicologoConfirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reagendada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
  });

  Consulta.associate = function(models) {
    Consulta.belongsTo(models.paciente, { foreignKey: 'paciente_id', as: 'paciente' });
    Consulta.belongsTo(models.psicologo, { foreignKey: 'psicologo_id', as: 'psicologo' });
  }
  
  return Consulta;
};