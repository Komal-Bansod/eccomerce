import Joi from 'joi';

export const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  userId: Joi.string().required(),
});