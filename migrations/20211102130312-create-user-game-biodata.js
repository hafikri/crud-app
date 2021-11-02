'use strict';

const { sequelize } = require("../models/users.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_game_biodata', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_game", key: "id"
        }
      }
     });
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_game_biodata');
  }
};
