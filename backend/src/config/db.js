// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('KarrieryTimesheet', 'root', '', { 
  host: 'localhost',
  dialect: 'mysql',
});

const start = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Connection has been established successfully.');
    await sequelize.sync(); 
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();

module.exports = sequelize;
