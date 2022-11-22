import mongoose, { Schema } from 'mongoose';

export interface INotificationsModel {
  public_id: string;
  user_id: string;
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

const NotificationsSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  user_id: { type: String },
  message: {type: String },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_active: { type: Boolean, default: true},
  is_deleted: { type: Boolean, default: false },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Notifications = mongoose.model<INotificationsModel>('Notifications', NotificationsSchema);

export default Notifications;
