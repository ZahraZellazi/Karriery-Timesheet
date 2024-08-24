const express = require('express');
const router = express.Router();
const dayController = require('../controllers/dayController');
const { validateDay } = require('../middlewares/validateDay');


router.post('/days',validateDay, dayController.createDay);
router.get('/days/:id', dayController.getDayById); //get 1 day by id
router.get('/days', dayController.getAllDays);// get all days 
router.put('/days/:id', validateDay,dayController.updateDay);
router.delete('/days/:id', dayController.deleteDay);

module.exports = router;
