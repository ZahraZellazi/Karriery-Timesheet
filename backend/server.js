//order of imports is important !!
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const relations = require('./src/models/index');
const sequelize = require('./src/config/db');

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());

//routes
app.use('/', require('./src/routes/authRoutes'));
app.use('/', require('./src/routes/dayRoutes'));
app.use('/', require('./src/routes/calendarRoutes'));

const PORT = process.env.PORT || 7050;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


