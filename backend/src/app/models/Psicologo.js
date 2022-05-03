
module.exports = (sequelize, DataTypes) => {
  const Psicologo = sequelize.define('psicologo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    crp: DataTypes.STRING,
    estado: DataTypes.STRING,
    formacoes: DataTypes.JSON,
    biografia: DataTypes.TEXT,
    precoSessao: DataTypes.DECIMAL(10,2),
    comecoAtendimento: DataTypes.STRING,
    finalAtendimento: DataTypes.STRING,
    imagem: DataTypes.STRING,
  });

  Psicologo.associate = function(models) {
    Psicologo.belongsTo(models.usuario, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Psicologo.hasMany(models.consultas, { foreignKey: 'psicologo_id', onDelete: 'CASCADE' });
    Psicologo.hasMany(models.anotacoes, { foreignKey: 'psicologo_id', onDelete: 'CASCADE' });
    Psicologo.hasMany(models.tarefa, { foreignKey: 'psicologo_id', onDelete: 'CASCADE' });
    Psicologo.hasMany(models.contratos, { foreignKey: 'psicologo_id', onDelete: 'CASCADE' });
    Psicologo.hasMany(models.feedbacks, { foreignKey: 'psicologo_id', onDelete: 'CASCADE' });
  }
  
  return Psicologo;
};