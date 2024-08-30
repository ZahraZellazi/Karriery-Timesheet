const { Holiday } = require('../models/holiday.entity'); // Adjust the path if necessary

// Add
exports.createHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.create(req.body);
    res.status(201).json(holiday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get 
exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.findAll();
    res.status(200).json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID
exports.getHolidayById = async (req, res) => {
  try {
    const holiday = await Holiday.findByPk(req.params.id);
    if (holiday) {
      res.status(200).json(holiday);
    } else {
      res.status(404).json({ message: 'Holiday not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateHoliday = async (req, res) => {
  try {
    const [updated] = await Holiday.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedHoliday = await Holiday.findByPk(req.params.id);
      res.status(200).json(updatedHoliday);
    } else {
      res.status(404).json({ message: 'Holiday not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
exports.deleteHoliday = async (req, res) => {
  try {
    const deleted = await Holiday.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Holiday not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
