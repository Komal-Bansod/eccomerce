import mongoose, { Schema } from 'mongoose';

export interface IInventoryModel {
    public_id: string;
    title: string;
    quantity: number;
    min: number;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    is_deleted: boolean;

    created_at: string;
    updated_at: string;
    deleted_at: string;
}

const InventorySchema: Schema = new Schema({
    public_id: { type: String, unique: true },
    title: { type: String },
    quantity: { type: Number },
    min: { type: Number },
    created_by: { type: String },
    updated_by: { type: String },
    deleted_by: { type: String },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: String },
    updated_at: { type: String },
    deleted_at: { type: String },
});

const Inventory = mongoose.model<IInventoryModel>('inventories', InventorySchema);

export default Inventory;
