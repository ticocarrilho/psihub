'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('psicologos', 'comecoAtendimento', {
          type: Sequelize.STRING,
          allowNull: false,
        }, { transaction: t }),
        queryInterface.addColumn('psicologos', 'finalAtendimento', {
          type: Sequelize.STRING,
          allowNull: false,
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('psicologos', 'comecoAtendimento', { transaction: t }),
        queryInterface.removeColumn('psicologos', 'finalAtendimento', { transaction: t }),
      ]);
    });
  }
};