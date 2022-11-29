import mongoose, { Schema } from 'mongoose';
export interface ISessionsModel {
  public_id: string;
  playlist_id: string;
  name: string;
  details: string;
  video_url: [];
  thumbnail_url: string;
  price:number
  session_start_date_time: string
  discount_price:number
  total_price: number;
  is_offline: boolean;
  room_id: string
  session_host: string
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;

  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const SessionsSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  playlist_id: { type: String },
  name: { type: String },
  details: { type: String},
  video_url: { type:[] },
  thumbnail_url: { type: String },
  price: { type: Number},
  session_start_date_time: { type: String },
  discount_price: { type: Number},
  total_price: { type: Number},
  room_id: { type: String },
  session_host: { type: String },
  is_offline: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
 

  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Sessions = mongoose.model<ISessionsModel>('sessionss', SessionsSchema);

export default Sessions;
