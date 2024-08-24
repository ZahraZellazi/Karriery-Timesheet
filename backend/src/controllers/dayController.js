// src/controllers/dayController.js
const Day = require('../models/day');

// Create a new Day
const createDay = async (req, res) => {
  const { date, workingHours, isHoliday } = req.body;

  try {
    const newDay = await Day.create({ date, workingHours, isHoliday });
    res.status(201).json(newDay);
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

// Get all Days
const getAllDays = async (req, res) => {
  try {
    const days = await Day.findAll();
    res.status(200).json(days);
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

// Update a Day
const updateDay = async (req, res) => {
  const { id } = req.params;
  const { date, workingHours, isHoliday } = req.body;

  try {
    const day = await Day.findByPk(id);
    if (!day) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Day not found' });
    }

    day.date = date;
    day.workingHours = workingHours;
    day.isHoliday = isHoliday;
    await day.save();

    res.status(200).json(day);
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

// Delete a Day
const deleteDay = async (req, res) => {
  const { id } = req.params;

  try {
    const day = await Day.findByPk(id);
    if (!day) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Day not found' });
    }

    await day.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
  }
};

module.exports = {
  createDay,
  getAllDays,
  updateDay,
  deleteDay
};
