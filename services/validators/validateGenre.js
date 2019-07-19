const Joi = require('@hapi/joi');

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(5).max(50).required()
    };
  
    return Joi.validate(genre, schema);
}

exports.validateGenre = validateGenre;