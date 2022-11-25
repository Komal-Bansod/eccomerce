import mongoose, { Schema } from 'mongoose';

export interface IUser {
  public_id: string
  role_id: string;
  guide_id: string;
  admin_id: string;
  user_details_id: string;
  username: string;
  email: string;
  password: string;
  mobile: string;
  is_active: boolean;
  is_admin: boolean;
  is_block: boolean;
  is_deleted: boolean;
  forgot_password_token: string;
  is_verified: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;

  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const UserSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  user_details_id: { type: String },
  guide_id:{type:String},
  admin_id:{type:String},
  username: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  role_id: { type: String },
  is_admin: { type: Boolean , default: false},
  is_block: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  forgot_password_token: { type: String },
  is_verified: { type: Boolean, default: true },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },

  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String }
});


const User = mongoose.model<IUser>('users', UserSchema);
export default User;

