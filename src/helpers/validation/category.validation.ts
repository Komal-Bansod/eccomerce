import Joi from 'joi';

export const categoryCreateSchema = Joi.object().keys({
  name:Joi.string().required(),
  slug:Joi.string(),
  tags: Joi.array(),
  parent_id: Joi.string().optional,
  description: Joi.string(),
  feature_image: Joi.string(),
  sort_order: Joi.string(),
  visible_on_homepage: Joi.boolean(),
  status: Joi.boolean()
});

export const categorySingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});

// export const userListSchema = Joi.object().keys({
//   search: Joi.string().optional(),
// });

export const categoryDeleteSchema = Joi.object().keys({
  deleteId: Joi.string().required(),
});

export const categoryUpdateSchema = Joi.object().keys({  
  updateId: Joi.string().required(),
    name:Joi.string().optional(),
    slug:Joi.string(),
    tags: Joi.array(),
    parent_id: Joi.string().optional,
    description: Joi.string(),
    feature_image: Joi.string(),
    sort_order: Joi.string(),
    visible_on_homepage: Joi.boolean(),
    status: Joi.boolean()
});
