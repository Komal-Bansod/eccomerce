import Joi from 'joi';

export const notificationCreateSchema = Joi.object().keys({
    user_id:Joi.string().required(),
    message:Joi.string().required()
});

export const notificationSingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});
