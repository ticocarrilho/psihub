'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('pacientes', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuarios', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        contrato_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'contratos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
      .dropTable('pacientes');
  }
};
