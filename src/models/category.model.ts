import mongoose, { Schema } from 'mongoose';

export interface ICategoryModel {
  public_id: string;
  name: string;
  slug: string;
  tags:[];
  parent_id: string;
  description: string;
  feature_image: string;
  sort_order:string;
  visible_on_homepage: boolean;
  status: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const CategorySchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  name: { type: String },
  slug:{type:String},
  tags:{type:[]},
  parent_id:{type:String},
  description:{type:String},
  feature_image:{type:String},
  sort_order:{type:String},
  visible_on_homepage:{type:Boolean, default:true},
  status:{type: Boolean, default:true},
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Category = mongoose.model<ICategoryModel>('Category', CategorySchema);

export default Category;