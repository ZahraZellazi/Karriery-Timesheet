const Day = require('../models/day.entity');

// Add
const createDay = async (req, res) => {
  const { date, workingHours, isHoliday } = req.body;

  try {
    await Day.create({ date, workingHours, isHoliday });
    res.status(201).json({ message: 'Day created successfully!' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Failed to create Day. Please try again.' });
  }
};

// Get a Day 
const getDayById = async (req, res) => {
  const { id } = req.params;

  try {
    const day = await Day.findByPk(id);
    if (!day) {
      return res.status(404).json({ message: 'Day not found.' });
    }

    res.status(200).json(day);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve Day. Please try again.' });
  }
};

// Get 
const getAllDays = async (req, res) => {
  try {
    const days = await Day.findAll();
    res.status(200).json(days);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve Days. Please try again.' });
  }
};

// Up
const updateDay = async (req, res) => {
  const { id } = req.params;
  const { date, workingHours, isHoliday } = req.body;

  try {
    const day = await Day.findByPk(id);
    if (!day) {
      return res.status(404).json({ message: 'Day not found.' });
    }

    day.date = date;
    day.workingHours = workingHours;
    day.isHoliday = isHoliday;
    await day.save();

    res.status(200).json({ message: 'Day updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update Day. Please try again.' });
  }
};

// Del
const deleteDay = async (req, res) => {
  const { id } = req.params;

  try {
    const day = await Day.findByPk(id);
    if (!day) {
      return res.status(404).json({ message: 'Day not found.' });
    }

    await day.destroy();
    res.status(200).json({ message: 'Day deleted successfully!' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete Day. Please try again.' });
  }
};

module.exports = {
  createDay,
  getDayById, 
  getAllDays,
  updateDay,
  deleteDay
};
