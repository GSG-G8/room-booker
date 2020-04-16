const connection = require('../config/connection');

const getBusinessHours = () => connection.query('SELECT * FROM businessHours ');

const patchBusinessHours = (daysOfWeek, startTime, endTime) =>
  connection.query({
    text: `UPDATE businessHours SET daysOfWeek=$1, startTime=$2, endTime=$3;`,
    values: [daysOfWeek, startTime, endTime],
  });

module.exports = { getBusinessHours, patchBusinessHours };
