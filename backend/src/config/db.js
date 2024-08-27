const { Sequelize } = require('sequelize');

const sequelizeConfig = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

const start = async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log(' ** Connection has been established successfully **');
    await sequelizeConfig.sync({ alter: true }); 
    console.log(' ** Database synced successfully ** ');
  } catch (error) {
    console.error('- Unable to connect to the database:', error, '-');
  }
};

start();

module.exports = sequelizeConfig;
