import mongoose, { Schema } from 'mongoose';
import { userType } from '../common/global-constants';

class PersonalDetails {
    first_name: { type: String };
    last_name: { type: String };
    date_of_birth: { type: Date };
    blood_group: { type: String };
    gender: { type: String };
    profile_pic: { type: String };
    docs: { type: [] }
}
class EmergencyContact {
    name: { type: String };
    relation: { type: String };
    number: { type: Number }
}
class ContactDetails {
    phone: { type: String };
    employee_email_personal: { type: String };
    employee_email_company: { type: String };
    mobile: { type: String };
    emergency_contact_one: EmergencyContact;
}

class AddressDetails {
    current_address: { type: String };
    permanent_address: { type: String };
    city: { type: String };
    state: { type: String };
    area: { type: String };
    country: { type: String };
}

class CompanyDetails {
    date_of_join: { type: Date };
    hiring_source: { type: String };
    slack_username: { type: String };
    designation: { type: String };
    department: { type: String };
    current_salary: { type: String };
    hourly_rate: { type: String };
    skills: { type: [] }
    is_remote: { type: Boolean, default: false }
}

class PastCompany {
    name: { type: String };
    address: { type: String };
    website: { type: String };
}

class PastJobs {
    designation: { type: String };
    company: PastCompany;
}

class QualificationDegree {
    name: { type: String };
    institute: { type: String };
    university: { type: String };
    city: { type: String };
}

class EducationDetails {
    master_degree: QualificationDegree;
    bachelor_degree: QualificationDegree;
    school: QualificationDegree;
}

class History {
    past_jobs: [PastJobs];
    education: EducationDetails;
}

class OtherCertificates {
    name: { type: String };
    details: { type: String };
    pdf_url: { type: String };
}

export interface IGuideModel {
    public_id: string;
    role_id: string;
    personal_details: PersonalDetails;
    contact_details: ContactDetails;
    address: AddressDetails;
    company_details: CompanyDetails,
    job_history: History;
    other_certificates: [OtherCertificates];
    is_active: boolean;
    is_deleted: boolean;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

const GuideSchema: Schema = new Schema({
    public_id: { type: String, unique: true },
    role_id: { type: String },
    personal_details: { type: Object },
    contact_details: { type: Object },
    address: { type: Object },
    company_details: { type: Object },
    job_history: { type: Object },
    other_certificates: { type: [] },
    is_active: { type: Boolean },
    is_deleted: { type: Boolean },
    created_by: { type: String },
    updated_by: { type: String },
    deleted_by: { type: String },
    created_at: { type: String },
    updated_at: { type: String },
    deleted_at: { type: String },
});

const Guide = mongoose.model<IGuideModel>('guides', GuideSchema);

export default Guide;
