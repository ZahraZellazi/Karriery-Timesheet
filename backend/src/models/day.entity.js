const sequelizeConfig = require('../config/db');  
const { DataTypes } = require('sequelize');

const Day = sequelizeConfig.define('Day', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER,
    defaultValue: false
  },
},
 {
  timestamps: false
});

module.exports = Day;
