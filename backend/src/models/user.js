const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../config/db'); // Import your Sequelize instance

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Enable timestamps (createdAt, updatedAt)
});

module.exports = User;
