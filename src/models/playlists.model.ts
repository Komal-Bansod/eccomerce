import mongoose, { Schema } from 'mongoose';


export interface IPlaylistsModel {
  public_id: string;
  name: string;
  heading: string;
  details: string;
  tags: [];
  category_id: string;
  session_count:number;
  guide_id: string;
  user_id: string;
  price:number
  discount_price:number
  total_price:number
  total_playlist_time: string;
  thumbnail_url: string;
  level: string;
  is_offline: boolean;
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;

  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const PlaylistsSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  name: { type: String },
  heading: { type: String },
  details: { type: String},
  tags: { type:[] },
  category_id: { type: String },
  session_count: { type: Number},
  guide_id: { type: String },
  price: { type: Number},
  discount_price: { type: Number},
  total_price: { type: Number},
  total_playlist_time: { type: String },
  thumbnail_url: { type: String },
  level: { type: String },
  is_offline: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
 

  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Playlists = mongoose.model<IPlaylistsModel>('playlists', PlaylistsSchema);

export default Playlists;
