const User = require('./user.entity');
const Calendar = require('./calendar.entity');
const Day = require('./day.entity');
const Holiday = require('./holiday.entity');

// User has many calendars (2023, 2024), one-to-many relationship
Calendar.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Calendar, { foreignKey: 'userId' });

// Calendar has many days (days of the year/month), one-to-many relationship
Day.belongsTo(Calendar, { foreignKey: 'calendarId' });
Calendar.hasMany(Day, { foreignKey: 'calendarId' });

// Calendar has many holidays, one-to-many relationship
Holiday.belongsTo(Calendar, { foreignKey: 'calendarId' });
Calendar.hasMany(Holiday, { foreignKey: 'calendarId' });


module.exports = {
    User,
    Calendar,
    Holiday,
    Day
};
