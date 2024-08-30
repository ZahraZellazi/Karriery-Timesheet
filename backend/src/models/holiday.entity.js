const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Holiday = sequelize.define('Holiday', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Public holiday', 'Personnel holiday', 'other'),
    allowNull: false
  },
  otherTypeHoliday: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false 
});

module.exports = Holiday;
