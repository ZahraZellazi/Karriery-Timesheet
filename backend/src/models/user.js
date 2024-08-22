const db = require('../config/db');

const checkEmailExists = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

const createUser = (firstname, lastname, email, password, callback) => {
  const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, email, password], callback);
};

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

module.exports = {
  checkEmailExists,
  createUser,
  findUserByEmail
};
