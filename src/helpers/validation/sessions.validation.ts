import Joi from 'joi';

export const sessionsCreateSchema = Joi.object().keys({
    playlist_id: Joi.string(),
    room_id:Joi.string(),
    name: Joi.string().required(),
    details:Joi.string(),
    video_url:Joi.array(),
    thumbnail_url:Joi.string(),
    price:Joi.number(),
    session_start_date_time:Joi.string(),
    discount_price:Joi.number(),
    total_price:Joi.number(),
    is_offline:Joi.boolean(),
    session_host:Joi.string(),
});

export const sessionsSingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});


export const sessionsDeleteSchema = Joi.object().keys({
  deleteId: Joi.string().required(),
});

export const sessionsUpdateSchema = Joi.object().keys({  
  updateId: Joi.string().required(),
  playlist_id: Joi.string(),
  room_id:Joi.string(),
  name: Joi.string(),
  details:Joi.string(),
  video_url:Joi.array(),
  thumbnail_url:Joi.string(),
  price:Joi.number(),
  session_start_date_time:Joi.string(),
  discount_price:Joi.number(),
  total_price:Joi.number(),
  is_offline:Joi.boolean(),
  session_host:Joi.string(),
});
