import Joi from 'joi';

export const roleCreationSchema = Joi.object().keys({
  role_name: Joi.string().required(),
  description: Joi.string(),
  permission: Joi.array()
});

export const roleUpdateSchema = Joi.object().keys({
  role_name: Joi.string().required(),
  updateId: Joi.string().required(),
});

export const roleDeleteSchema = Joi.object().keys({
  deleteId: Joi.string().required(),
});

export const roleSingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});
