const Joi = require('@hapi/joi');

function validateUser({name,email,password}) {
    const user = {name,email,password};
    const schema = {
      name: Joi.string()
        .min(2)
        .max(50)
        .required(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required()
    };
  
    return Joi.validate(user, schema);
}

exports.validateUser = validateUser;