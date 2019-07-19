const Joi = require('@hapi/joi');

function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      genre: Joi.object({
        id: Joi.required(),
        name: Joi.required()
      }),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(movie, schema);
}

exports.validateMovie = validateMovie;