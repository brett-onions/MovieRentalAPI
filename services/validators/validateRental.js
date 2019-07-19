const Joi = require('@hapi/joi');

function validateRental(rental) {
    const schema = {
      customer: Joi.required(),
      movie: Joi.required()
    };
  
    return Joi.validate(rental, schema);
}

exports.validateRental = validateRental;