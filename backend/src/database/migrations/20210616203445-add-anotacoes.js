'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('anotacoes', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        paciente_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'pacientes', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        psicologo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'psicologos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        titulo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('anotacoes');
  }
};
