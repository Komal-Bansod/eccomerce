import Joi from 'joi';

export const updatePasswordSchema = Joi.object().keys({
    token :Joi.string().required(),
    password: Joi.string().required()
  
});