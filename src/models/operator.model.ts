/* eslint-disable max-classes-per-file */

import mongoose, { Schema } from 'mongoose';
import { userType } from '../common/global-constants';

class LicenseDetails {
  license_type: string;
  license_number: string;
  image: boolean;
}
class SubscriptionSettings {
  subscription: string;
  sharing: string;
}

class PackageDetails {
  package_id: string;
  business_types: [SubscriptionSettings];
  balance: number;
  currency_ids: [];
  start_date: string;
}

export interface IOperator {
  public_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  company_name: string;
  license: [LicenseDetails];
  website: string;
  package_details: [PackageDetails];
  user_name: string;
  password: string;
  role_id: string;
  admin_id: string;
  mobile: string;
  email: string;
  profile_pic: string;
  date_of_birth: Date;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  is_deleted: boolean;

  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const OperatorSchema: Schema = new Schema({
  public_id: { type: String, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  gender: { type: String },
  company_name: { type: String },
  license: { type: [] },
  website: { type: String },
  package_details: { type: [] },
  user_name: { type: String },
  password: { type: String },
  role_id: { type: String, default: userType.operator },
  admin_id: { type: String },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  profile_pic: { type: String },
  date_of_birth: { type: Date },
  is_active: { type: Boolean, default: true },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
  is_deleted: { type: Boolean, default: false },

  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
});

const Operator = mongoose.model<IOperator>('operators', OperatorSchema);

export default Operator;
