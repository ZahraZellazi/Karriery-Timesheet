const validateDay = (req, res, next) => {
    const { date, workingHours, isHoliday } = req.body;

    if (!date) {
        const error = { code: 'MISSING_FIELD', message: 'Date is required' };
        console.error(error); 
        return res.status(400).json(error);
    }
    if (!workingHours) {
        const error = { code: 'MISSING_FIELD', message: 'Working hours are required' };
        console.error(error);
        return res.status(400).json(error);
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        const error = { code: 'INVALID_DATE_FORMAT', message: 'Date must be in the format YYYY-MM-DD' };
        console.error(error);
        return res.status(400).json(error);
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        const error = { code: 'INVALID_DATE', message: 'Invalid date' };
        console.error(error);
        return res.status(400).json(error);
    }

    const minDate = new Date('1900-01-01');
    const maxDate = new Date('2100-12-31');
    if (dateObj < minDate || dateObj > maxDate) {
        const error = { code: 'DATE_OUT_OF_RANGE', message: 'Date must be between 01-01-1900 and 31-12-2100' };
        console.error(error);
        return res.status(400).json(error);
    }

    if (isHoliday !== undefined && typeof isHoliday !== 'boolean') {
        const error = { code: 'INVALID_IS_HOLIDAY', message: 'isHoliday must be a boolean' };
        console.error(error);
        return res.status(400).json(error);
    }

    next();
};

module.exports = {
    validateDay,
};
