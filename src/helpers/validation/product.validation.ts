import Joi from 'joi';

export const productCreateSchema = Joi.object().keys({
  slug:Joi.string().required(),
  name:Joi.string(),
  tags:Joi.array(),
  description:Joi.string(),
  category_id:Joi.string().required(),
  inventory_id:Joi.string().required(),
  images:Joi.array().items(
    Joi.object({
      url: Joi.string(),
      primary: Joi.boolean().default(0) })),
  price:Joi.number(),
  discount_id:Joi.string(),
  sku: Joi.string(),
  brand: Joi.string(),
  is_active: Joi.string(),
});

export const productSingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});


export const productDeleteSchema = Joi.object().keys({
  deleteId: Joi.string().required(),
});

export const productUpdateSchema = Joi.object().keys({  
  updateId: Joi.string().required(),
  slug:Joi.string().required(),
  name:Joi.string(),
  tags:Joi.array(),
  description:Joi.string(),
  category_id:Joi.string(),
  inventory_id:Joi.string(),
  images:Joi.string(),
  price:Joi.number(),
  discount_id:Joi.string(),
  sku: Joi.string(),
  brand: Joi.string(),
  is_active: Joi.string(),
});
