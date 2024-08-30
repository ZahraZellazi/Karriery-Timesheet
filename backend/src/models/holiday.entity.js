const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

//enum values/freeze
const HolidayTypes = Object.freeze({
  PUBLIC_HOLIDAY: 'Public holiday',
  PERSONNEL_HOLIDAY: 'Personnel holiday',
  OTHER: 'other'
});

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
    type: DataTypes.ENUM(
      HolidayTypes.PUBLIC_HOLIDAY,
      HolidayTypes.PERSONNEL_HOLIDAY,
      HolidayTypes.OTHER
    ),
    allowNull: false
  },
  otherTypeHoliday: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false 
});

module.exports = { Holiday, HolidayTypes };
