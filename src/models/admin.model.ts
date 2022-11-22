import mongoose, { Schema } from 'mongoose';
import { userType } from '../common/global-constants';

export interface IAdminModel {
  public_id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: Date;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;

  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const AdminSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true },
  date_of_birth: { type: Date },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
 

  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Admin = mongoose.model<IAdminModel>('admins', AdminSchema);

export default Admin;
