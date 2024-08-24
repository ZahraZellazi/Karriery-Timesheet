const express = require('express');
const { signup, login, getUserById, getAllUsers, updateUser, deleteUser } = require('../controllers/authController');
const { validateSignup } = require('../middlewares/validate');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.get('/users', getAllUsers); // Get all users
router.get('/users/:id', getUserById); // Get a specific user by ID
router.put('/users/:id', updateUser); // Update a user by ID
router.delete('/users/:id', deleteUser); // Delete a user by ID

module.exports = router;
