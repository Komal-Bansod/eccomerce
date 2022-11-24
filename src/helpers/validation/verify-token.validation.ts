import Joi from 'joi';

export const verifyTokenSchema = Joi.object().keys({
    token: Joi.string().required(),
});