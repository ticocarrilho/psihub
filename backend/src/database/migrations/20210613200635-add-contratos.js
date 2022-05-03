'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('contratos', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        psicologo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'psicologos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        precoSessao: {
          type: Sequelize.DECIMAL(10,2),
          allowNull: false
        },
        inicioContrato: {
          type: Sequelize.DATE,
          allowNull: false
        },
        finalContrato: {
          type: Sequelize.DATE,
          allowNull: false
        },
        uuid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
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
      .dropTable('contratos');
  }
};
