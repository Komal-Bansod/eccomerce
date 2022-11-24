import mongoose, { Schema } from 'mongoose';

export interface IDiscountModel {
    public_id: string;
    title: string;
    amount: number;
    is_active: boolean;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    is_deleted: boolean;

    created_at: string;
    updated_at: string;
    deleted_at: string;
}

const DiscountSchema: Schema = new Schema({
    public_id: { type: String, unique: true },
    title: { type: String },
    amount: { type: Number },
    is_active:{type:Boolean, default: true},
    created_by: { type: String },
    updated_by: { type: String },
    deleted_by: { type: String },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: String },
    updated_at: { type: String },
    deleted_at: { type: String },
});

const Discount = mongoose.model<IDiscountModel>('discounts', DiscountSchema);

export default Discount;
