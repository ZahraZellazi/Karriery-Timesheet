const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  User.checkEmailExists(email, async (err, results) => {
    if (err) {
      return res.status(500).json({ code: 'DB_ERROR', message: 'Database query error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ code: 'EMAIL_EXISTS', message: 'Email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      User.createUser(firstname, lastname, email, hashedPassword, (err, result) => {
        if (err) {
          return res.status(500).json({ code: 'DB_ERROR', message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, async (err, results) => {
    if (err) {
      return res.status(500).json({ code: 'DB_ERROR', message: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token });
  });
};

module.exports = {
  signup,
  login
};
