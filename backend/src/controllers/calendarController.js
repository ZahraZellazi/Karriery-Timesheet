const Calendar = require("../models/calendar.entity");
const User = require("../models/user.entity");
const { Day, Holiday } = require('../models');
const sequelizeConfig = require('../config/db');  
// Add
const createCalendar = async (req, res) => {
  const { year, userId, dayClicked, workdayHours, holidayInput } = req.body;

  const dayNumberMap = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7,
  };

  const transaction = await sequelizeConfig.transaction();

  try {
    const newCalendar = await Calendar.create({ year, userId }, { transaction });

    const dayNumber = dayNumberMap[dayClicked];
    if (!dayNumber) {
      return res.status(400).json({ error: "Invalid day clicked" });
    }

    await Day.create({
      name: dayClicked,
      hours: workdayHours || 0, 
      number: dayNumber,
      calendarId: newCalendar.id,
    }, { transaction });

    if (holidayInput) {
      await Holiday.create({
        start: holidayInput.start || new Date(), 
        end: holidayInput.end || new Date(), 
        type: holidayInput.type || null, 
        otherTypeHoliday: holidayInput.otherTypeHoliday || null, 
        calendarId: newCalendar.id,
      }, { transaction });
    }

    await transaction.commit(); 
    return res.status(201).json(newCalendar);
  } catch (error) {
    await transaction.rollback(); 
    console.error("Error creating calendar:", error);
    return res.status(500).json({ error: error.message });
  }
};



// get
const getAllCalendars = async (req, res) => {
  try {
    const calendars = await Calendar.findAll();
    res.status(200).json(calendars);
  } catch (error) {
    res.status(500).json({ error: "Error fetching calendars" });
  }
};

// Get by ID
const getCalendarById = async (req, res) => {
  const { id } = req.params;

  try {
    const calendar = await Calendar.findByPk(id, {
      include: [
        { model: Day, as: 'days' },
        { model: Holiday, as: 'holidays' }
      ]
    });
    if (calendar) {
      res.status(200).json(calendar);
    } else {
      res.status(404).json({ error: "Calendar not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching calendar" });
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
      res.status(404).json({ error: "Calendar not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating calendar" });
  }
};

// Delete
const deleteCalendarById = async (req, res) => {
  const { id } = req.params;

  try {
    const calendar = await Calendar.findByPk(id);
    if (calendar) {
      await calendar.destroy();
      res.status(200).json({ message: "Calendar deleted" });
    } else {
      res.status(404).json({ error: "Calendar not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting calendar" });
  }
};

module.exports = {
  createCalendar,
  getAllCalendars,
  getCalendarById,
  updateCalendarById,
  deleteCalendarById,
};
