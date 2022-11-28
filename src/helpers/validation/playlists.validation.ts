import Joi from 'joi';

export const playlistsCreateSchema = Joi.object().keys({
    name: Joi.string().required(),
    heading: Joi.string(),
    details: Joi.string(),
    tags: Joi.array(),
    category_id: Joi.string(),
    session_count: Joi.number(),
    guide_id: Joi.string(),
    user_id: Joi.string(),
    price: Joi.number(),
    discount_price: Joi.number(),
    total_price: Joi.number(),
    total_playlist_time:Joi.string(),
    thumbnail_url: Joi.string(),
    level: Joi.string()
});

export const playlistsSingleSchema = Joi.object().keys({
    id: Joi.string().required(),
});

export const playlistsDeleteSchema = Joi.object().keys({
    deleteId: Joi.string().required(),
});

export const playlistsUpdateSchema = Joi.object().keys({
    updateId: Joi.string().required(),
    name: Joi.string(),
    heading: Joi.string(),
    details: Joi.string(),
    tags: Joi.array(),
    category_id: Joi.string(),
    session_count: Joi.number(),
    guide_id: Joi.string(),
    user_id: Joi.string(),
    price: Joi.number(),
    discount_price: Joi.number(),
    total_price: Joi.number(),
    total_playlist_time:Joi.string(),
    thumbnail_url: Joi.string(),
    level: Joi.string()
});
