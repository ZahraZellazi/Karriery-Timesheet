const User = require('./user.entity');
const Calendar = require('./calendar.entity');
const Day = require('./day.entity');

//User has many calendars ( 2024 ,2024) one To many
Calendar.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Calendar, { foreignKey: 'userId' });

// contine the reset here

module.exports = {
    User,
    Calendar,
    Day
}
