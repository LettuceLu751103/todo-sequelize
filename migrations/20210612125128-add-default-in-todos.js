'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      `Todo`,
      `isDone`,
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      })
  },

  down: async (queryInterface, Sequelize) => {

    queryInterface.removeColumn(`Todo`, `isDone`)
  }
};
