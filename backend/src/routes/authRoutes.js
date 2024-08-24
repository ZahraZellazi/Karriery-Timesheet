const express = require('express');
const { signup, login, getUserById, getAllUsers, updateUser, deleteUser } = require('../controllers/authController');
const { validateSignup } = require('../middlewares/validate');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.get('/users', getAllUsers); //all users
router.get('/users/:id', getUserById); //user by ID
router.put('/users/:id', updateUser); // Up
router.delete('/users/:id', deleteUser); // Del

module.exports = router;
