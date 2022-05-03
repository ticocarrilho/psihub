'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('consultas', 'pacienteConfirmado', {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }, { transaction: t }),
        queryInterface.addColumn('consultas', 'psicologoConfirmado', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }, { transaction: t }),
        queryInterface.addColumn('consultas', 'reagendada', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('consultas', 'pacienteConfirmado', { transaction: t }),
        queryInterface.removeColumn('consultas', 'psicologoConfirmado', { transaction: t }),
        queryInterface.removeColumn('consultas', 'reagendada', { transaction: t }),
      ]);
    });
  }
};