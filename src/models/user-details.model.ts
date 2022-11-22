import mongoose, { Schema } from 'mongoose';

class UserAddress {
    house_no: { type: String };
    street: { type: String };
    area: { type: String };
    city: { type: String };
    state: { type: String };
    country: { type: String };
    pin_code: { type: String };
    is_primary:{ typ:boolean};
};

export interface IUserMetaData {
    public_id: string;
    display_name: string;
    gender: string;
    date_of_birth: Date;
    first_name: string;
    last_name: string;
    address: [UserAddress],
    profile_pic: string;
    is_deleted:string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
}

const UserDetailSchema: Schema = new Schema({
    public_id: { type: String, unique: true },
    display_name: { type: String },
    gender: { type: String },
    date_of_birth: { type: Date },
    first_name: { type: String },
    last_name: { type: String },
    address: { type: [] },
    profile_pic: { type: String },
    is_deleted:{type:Boolean},
    created_by: { type: String },
    updated_by: { type: String },
    created_at: { type: String },
    updated_at: { type: String }
});


const UserMetaData = mongoose.model<IUserMetaData>('user-details', UserDetailSchema);
export default UserMetaData;

