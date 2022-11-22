import Joi from 'joi';

export const adminLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().max(15).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  mobile: Joi.string().required(),
  date_of_birth: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  display_name:Joi.string(),
  username: Joi.string()
});

export const adminUpdateSchema = Joi.object().keys({
  updateId: Joi.string().required(),
  email: Joi.string().email(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  //mobile: Joi.string().required(),
  date_of_birth: Joi.string().required(),
  //gender: Joi.string().valid('Male', 'Female', 'Other').required(),
 // display_name:Joi.string(),
 // username: Joi.string()
});
