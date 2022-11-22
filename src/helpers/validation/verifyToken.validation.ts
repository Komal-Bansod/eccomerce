import Joi from 'joi';

export const verifyTokenSchema = Joi.object().keys({
    verifyToken :Joi.string().required(),
  
});