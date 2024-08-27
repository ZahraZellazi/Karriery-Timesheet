const sequelizeConfig = require('../config/db');  
const { DataTypes } = require('sequelize');

const Calendar = sequelizeConfig.define('Calendar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Calendar;
