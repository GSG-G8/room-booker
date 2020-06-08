const Boom = require('@hapi/boom');
const { getBusinessHours, patchBusinessHours } = require('../database/queries');
const businessHoursSchema = require('./validation/businessHoursSchema');

const get = (req, res, next) => {
  getBusinessHours()
    .then(({ rows }) => {
      res.json(rows[0]);
    })
    .catch(next);
};

const patch = (req, res, next) => {
  const { daysOfWeek, startTime, endTime } = req.body;

  businessHoursSchema
    .validateAsync({ daysOfWeek, startTime, endTime })
    .catch((error) => {
      throw Boom.badRequest(error);
    })
    .then(() => patchBusinessHours(daysOfWeek, startTime, endTime))
    .then(() => res.json({ message: 'business hours updated successfully' }))
    .catch(next);
};

module.exports = { get, patch };
