const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ code: 'EMAIL_EXISTS', message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ firstname, lastname, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    }
//JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login
};
