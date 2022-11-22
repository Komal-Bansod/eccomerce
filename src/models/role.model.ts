import mongoose, { Schema } from 'mongoose';

export interface IRoleModel {
  public_id: string;
  role_name: string;
  description: string;
  permission:[object];
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const RoleSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  role_name: { type: String },
  description: { type: String },
  permission:{type:Array},
  is_deleted: { type: Boolean, default: false },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Role = mongoose.model<IRoleModel>('roles', RoleSchema);

export default Role;
