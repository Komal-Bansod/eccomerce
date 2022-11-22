import mongoose, { Schema } from 'mongoose';

export interface ISessionModel {
  public_id: string;
  user_agent: string;
  is_expired: boolean;
  user_id: string;
  access_token: string;
  refresh_token: string;
  user_type: string;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  is_deleted: boolean;

  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const SessionSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  user_agent: { type: String },
  is_expired: { type: Boolean, default: false },
  user_id: { type: String },
  access_token: { type: String },
  refresh_token: { type: String },
  user_type: { type: String },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_deleted: { type: Boolean, default: false },

  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Sessions = mongoose.model<ISessionModel>('sessions', SessionSchema);

export default Sessions;
