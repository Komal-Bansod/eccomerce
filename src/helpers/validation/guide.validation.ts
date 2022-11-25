import Joi from 'joi';

export const guideCreateSchema = Joi.object().keys({
    personal_details: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        blood_group: Joi.string().required(),
        gender: Joi.string().valid('Male', 'Female', 'Other').required(),
        profile_pic: Joi.string().required(),
        docs: Joi.array()
    }),
    contact_details: Joi.object({
        phone: Joi.string().pattern(/^[0-9]+$/),
        employee_email_personal: Joi.string().email().required(),
        employee_email_company: Joi.string().email().required(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/),
        emergency_contact_one: Joi.object({
            name: Joi.string().required(),
            relation: Joi.string().required(),
            number: Joi.string().length(10).pattern(/^[0-9]+$/)
        }),
    }),
    address: Joi.object({
        current_address: Joi.string().required(),
        permanent_address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        area: Joi.string().required(),
        country: Joi.string().required(),
    }),
    company_details: Joi.object({
        date_of_join: Joi.date(),
        hiring_source: Joi.string().required(),
        slack_username: Joi.string(),
        designation: Joi.string().required(),
        department: Joi.string().required(),
        current_salary: Joi.string(),
        hourly_rate: Joi.string().required(),
        skills: Joi.string().required(),
        is_remote: Joi.boolean(),
    }),
    job_history: Joi.object({
        past_jobs: Joi.array().items(
            Joi.object({
                designation: Joi.string(),
                company: Joi.object({
                    address: Joi.string(),
                    company: Joi.string(),
                    website: Joi.string()
                })
            })
        ),
        education: Joi.string().required()
    }),
    other_certificates: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            details: Joi.string(),
            pdf_url: Joi.string(),

        })
    ),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

});


export const guideDeleteSchema = Joi.object().keys({
    deleteId: Joi.string().required(),
  });
  
  export const guideSingleSchema = Joi.object().keys({
    id: Joi.string().required(),
  });
  

  export const guideUpdateSchema = Joi.object().keys({
    personal_details: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        blood_group: Joi.string().required(),
        gender: Joi.string().valid('Male', 'Female', 'Other').required(),
        profile_pic: Joi.string().required(),
        docs: Joi.array()
    }),
    contact_details: Joi.object({
        phone: Joi.string().pattern(/^[0-9]+$/),
        employee_email_personal: Joi.string().email().required(),
        employee_email_company: Joi.string().email().required(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/),
        emergency_contact_one: Joi.object({
            name: Joi.string().required(),
            relation: Joi.string().required(),
            number: Joi.string().length(10).pattern(/^[0-9]+$/)
        }),
    }),
    address: Joi.object({
        current_address: Joi.string().required(),
        permanent_address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        area: Joi.string().required(),
        country: Joi.string().required(),
    }),
    company_details: Joi.object({
        date_of_join: Joi.date(),
        hiring_source: Joi.string().required(),
        slack_username: Joi.string(),
        designation: Joi.string().required(),
        department: Joi.string().required(),
        current_salary: Joi.string(),
        hourly_rate: Joi.string().required(),
        skills: Joi.string().required(),
        is_remote: Joi.boolean(),
    }),
    job_history: Joi.object({
        past_jobs: Joi.array().items(
            Joi.object({
                designation: Joi.string(),
                company: Joi.object({
                    address: Joi.string(),
                    company: Joi.string(),
                    website: Joi.string()
                })
            })
        ),
        education: Joi.string().required()
    }),
    other_certificates: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            details: Joi.string(),
            pdf_url: Joi.string(),

        })
    ),
    display_name: Joi.string().optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
    mobile: Joi.string().optional(),
    email: Joi.string().email().optional(),
    username: Joi.string().optional(),
    profile_pic: Joi.string().optional(),
    date_of_birth: Joi.date().optional(),
    updateId: Joi.string().required(),


})