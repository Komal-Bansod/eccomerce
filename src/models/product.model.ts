import mongoose, { Schema } from 'mongoose';

class productImage {
  url: { type: String };
  primary: { type: boolean, default :false };
};
export interface IProductModel {
  public_id: string;
  slug: string;
  name: string;
  tags: [];
  description: string;
  category_id: string;
  inventory_id: string;
  images: [productImage];
  price: number;
  discount_id: string;
  sku: string;
  brand: string;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const ProductSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  slug: { type: String },
  name: { type: String },
  tags: { type: [] },
  description: { type: String },
  category_id: { type: String },
  inventory_id: { type: String },
  images:{type:[]},
  price: { type: Number},
  discount_id: { type: String},
  sku: { type: String, unique: true },
  brand: { type: String },
  is_active: {type: Boolean, default: true },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Product  = mongoose.model<IProductModel>('products', ProductSchema);

export default Product