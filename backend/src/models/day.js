const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Day = sequelize.define('Day', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  workingHours: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isHoliday: {
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  }
}, {
  timestamps: false
});

module.exports = Day;
