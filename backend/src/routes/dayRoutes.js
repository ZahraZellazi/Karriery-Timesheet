// src/routes/dayRoutes.js
const express = require('express');
const router = express.Router();
const dayController = require('../controllers/dayController');

router.post('/days', dayController.createDay);
router.get('/days', dayController.getAllDays);
router.put('/days/:id', dayController.updateDay);
router.delete('/days/:id', dayController.deleteDay);

module.exports = router;
