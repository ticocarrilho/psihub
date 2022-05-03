'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('psicologos', {
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
        precoSessao: {
          type: Sequelize.DECIMAL(10,2),
          allowNull: false
        },
        crp: {
          type: Sequelize.STRING,
          allowNull: false
        },
        estado: {
          type: Sequelize.STRING,
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
      .dropTable('psicologos');
  }
};
