const express = require('express');
const {createCalendar,getAllCalendars,getCalendarById,updateCalendarById,deleteCalendarById} =require('../controllers/calendarController');
const router = express.Router();

router.post('/calendars', createCalendar);
router.get('/calendars', getAllCalendars);
router.get('/calendars/:id', getCalendarById);
router.put('/calendars/:id', updateCalendarById);
router.delete('/calendars/:id', deleteCalendarById);

module.exports = router;
