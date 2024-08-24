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


// GET: Fetch a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

// GET: Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

// PUT: Update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    // Hash password if it's being updated
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({ firstname, lastname, email, password: hashedPassword });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

// DELETE: Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
