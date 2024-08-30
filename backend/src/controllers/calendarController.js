const Calendar = require('../models/calendar.entity');

// Add
const createCalendar = async (req, res) => {
    const { year, userId } = req.body;

    try {
        const calendar = await Calendar.create({ year, userId });
        res.status(201).json(calendar);
    } catch (error) {
        res.status(500).json({ error: 'Error creating calendar' });
    }
};

// get
const getAllCalendars = async (req, res) => {
    try {
        const calendars = await Calendar.findAll();
        res.status(200).json(calendars);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching calendars' });
    }
};

// Get by ID
const getCalendarById = async (req, res) => {
    const { id } = req.params;

    try {
        const calendar = await Calendar.findByPk(id);
        if (calendar) {
            res.status(200).json(calendar);
        } else {
            res.status(404).json({ error: 'Calendar not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching calendar' });
    }
};

// Update 
const updateCalendarById = async (req, res) => {
    const { id } = req.params;
    const { year } = req.body;

    try {
        const calendar = await Calendar.findByPk(id);
        if (calendar) {
            calendar.year = year;
            await calendar.save();
            res.status(200).json(calendar);
        } else {
            res.status(404).json({ error: 'Calendar not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating calendar' });
    }
};

// Delete 
const deleteCalendarById = async (req, res) => {
    const { id } = req.params;

    try {
        const calendar = await Calendar.findByPk(id);
        if (calendar) {
            await calendar.destroy();
            res.status(200).json({ message: 'Calendar deleted' });
        } else {
            res.status(404).json({ error: 'Calendar not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting calendar' });
    }
};

module.exports = {
    createCalendar,
    getAllCalendars,
    getCalendarById,
    updateCalendarById,
    deleteCalendarById
};
