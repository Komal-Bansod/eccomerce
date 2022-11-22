import mongoose, { Schema } from 'mongoose';

export interface IReviewsModel {
  public_id: string;
  user_id: string;
  rates: string;
  review: string;
  is_approved: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const ReviewsSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  user_id: { type: String },
  rates:{type:String},
  review:{type: String},
  is_approved:{type: Boolean},
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Reviews = mongoose.model<IReviewsModel>('Reviews', ReviewsSchema);

export default Reviews;