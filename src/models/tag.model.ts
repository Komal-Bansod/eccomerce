import mongoose, { Schema } from 'mongoose';

export interface ITagModel {
  public_id: string;
  name: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const TagSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  name: { type: String },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_active: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Tag = mongoose.model<ITagModel>('tags', TagSchema);

export default Tag;
