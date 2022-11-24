import mongoose, { Schema } from 'mongoose';

export interface IAuditModel {
  public_id: string;
  status: boolean;
  platform: string;
  send_to: string;
  send_from: string;
  message: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const AuditSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  status: { type: Boolean },
  platform: {type: String },
  send_to: {type: String},
  send_from :{type: String},
  message: {type: String},
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_active: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Audit = mongoose.model<IAuditModel>('audits', AuditSchema);

export default Audit;
