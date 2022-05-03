'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('psicologos', 'formacoes', {
          type: Sequelize.JSON,
          allowNull: false
        }, { transaction: t }),
        queryInterface.addColumn('psicologos', 'biografia', {
          type: Sequelize.TEXT,
          allowNull: false
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('psicologos', 'formacoes', { transaction: t }),
        queryInterface.removeColumn('psicologos', 'biografia', { transaction: t }),
      ]);
    });
  }
};