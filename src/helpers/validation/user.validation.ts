import Joi from 'joi';
import { CountryCodes } from 'validator/lib/isISO31661Alpha2';

export const userCreateSchema = Joi.object().keys({
  username:Joi.string().required(),
  forgot_password_token:Joi.string(),
  is_verified: Joi.boolean(),
  data_of_birth: Joi.string(),
  display_name: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  mobile: Joi.string().length(10).pattern(/^[0-9]+$/),
  email: Joi.string().email().required(),
  profile_pic: Joi.string().optional(),
  date_of_birth: Joi.string(),
  password: Joi.string().max(15).required(),
  address: Joi.array().items(
    Joi.object().keys({
      house_no: Joi.string().optional().empty(''),
      street: Joi.string().optional().empty(''),
      area: Joi.string().optional().empty(''),
      city: Joi.string().optional().empty(''),
      state: Joi.string().optional().empty(''),
      country: Joi.string().optional().empty(''),
      pin_code: Joi.string().optional().empty(''),
    }),
  ),
  role_id:Joi.string(),
  is_admin:Joi.boolean()
});

export const userSingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});

// export const userListSchema = Joi.object().keys({
//   search: Joi.string().optional(),
// });

export const userDeleteSchema = Joi.object().keys({
  deleteId: Joi.string().required(),
});

export const userUpdateSchema = Joi.object().keys({  
  display_name: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
  is_admin_id: Joi.boolean().optional(),
  mobile: Joi.string().optional(),
  email: Joi.string().email().optional(),
  username: Joi.string().optional(),
  profile_pic: Joi.string().optional(),
  date_of_birth: Joi.string().optional(),
  updateId: Joi.string().required(),
  password: Joi.string().max(15).optional(),
  address: Joi.array().items(
    Joi.object().keys({
      house_no: Joi.string().optional(),
      street: Joi.string().optional(),
      area: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      pin_code: Joi.string().optional(),
    }),
  ),
});


export const userChangePasswordSchema = Joi.object().keys({  
  newPassword: Joi.string().required(),
  currentPassword: Joi.string().required(),
  
});
