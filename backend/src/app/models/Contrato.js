
module.exports = (sequelize, DataTypes) => {
  const Contrato = sequelize.define('contratos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    psicologo_id: {
      type: DataTypes.INTEGER,
      references: 'psicologo',
      referencesKey: 'id'
    },
    inicioContrato: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finalContrato: {
      type: DataTypes.DATE,
      allowNull: false
    },
    precoSessao: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
  });

  Contrato.associate = function(models) {
    Contrato.hasMany(models.paciente, { foreignKey: 'contrato_id', as: 'contrato' });
    Contrato.belongsTo(models.psicologo, { foreignKey: 'psicologo_id', as: 'psicologo' });
  }

  return Contrato;
};