import Joi from 'joi';

export const inventoryCreationSchema = Joi.object().keys({
  title: Joi.string().required(),
  quantity: Joi.number().required(),
  min: Joi.number()
});

export const inventoryUpdateSchema = Joi.object().keys({
  title: Joi.string(),
  updateId: Joi.string().required(),
  quantity :Joi.number(),
  min: Joi.number()
});

export const inventoryDeleteSchema = Joi.object().keys({
  deleteId: Joi.string().required(),
});

export const inventorySingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});
