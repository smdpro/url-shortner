'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Urls', 'userId', Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Urls', 'userId');
  }
};
