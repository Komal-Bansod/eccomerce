import Joi from 'joi';

export const guideCreateSchema = Joi.object().keys({
    personal_details: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        blood_group: Joi.string(),
        gender: Joi.string().valid('Male', 'Female', 'Other').required(),
        profile_pic: Joi.string(),
        docs: Joi.array()
    }),
    contact_details: Joi.object({
        phone: Joi.string().pattern(/^[0-9]+$/),
        employee_email_personal: Joi.string().email().required(),
        employee_email_company: Joi.string().email(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        emergency_contact_one: Joi.object({
            name: Joi.string(),
            relation: Joi.string(),
            number: Joi.string().length(10).pattern(/^[0-9]+$/)
        }),
    }),
    address: Joi.object({
        current_address: Joi.string(),
        permanent_address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        area: Joi.string(),
        country: Joi.string(),
    }),
    company_details: Joi.object({
        date_of_join: Joi.date(),
        hiring_source: Joi.string(),
        slack_username: Joi.string(),
        designation: Joi.string().required(),
        department: Joi.string(),
        current_salary: Joi.string(),
        hourly_rate: Joi.string(),
        skills: Joi.array(),
        is_remote: Joi.boolean(),
    }),
    job_history: Joi.object({
        past_jobs: Joi.array().items(
            Joi.object({
                designation: Joi.string(),
                company: Joi.object({
                    name: Joi.string(),
                    address: Joi.string(),
                    website: Joi.string()
                })
            })
        ),
        education:  Joi.object({
            master_degree: Joi.object({
                name: Joi.string(),
                institute: Joi.string(),
                university: Joi.string(),
                city: Joi.string(),
            }),
            bachelor_degree: Joi.object({
                name: Joi.string(),
                institute: Joi.string(),
                university: Joi.string(),
                city: Joi.string(),
            }).required(),
            school: Joi.object({
                name: Joi.string(),
                institute: Joi.string(),
                board: Joi.string(),
                city: Joi.string(),
            }),

        })
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
        first_name: Joi.string(),
        last_name: Joi.string(),
        date_of_birth: Joi.date(),
        blood_group: Joi.string(),
        gender: Joi.string().valid('Male', 'Female', 'Other'),
        profile_pic: Joi.string(),
        docs: Joi.array()
    }),
    contact_details: Joi.object({
        phone: Joi.string().pattern(/^[0-9]+$/),
        employee_email_personal: Joi.string().email(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/),
        emergency_contact_one: Joi.object({
            name: Joi.string(),
            relation: Joi.string(),
            number: Joi.string().length(10).pattern(/^[0-9]+$/)
        }),
    }),
    address: Joi.object({
        current_address: Joi.string(),
        permanent_address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        area: Joi.string(),
        country: Joi.string(),
    }),
    company_details: Joi.object({
        date_of_join: Joi.date(),
        hiring_source: Joi.string(),
        slack_username: Joi.string(),
        designation: Joi.string(),
        department: Joi.string(),
        current_salary: Joi.string(),
        hourly_rate: Joi.string(),
        skills: Joi.array(),
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
        education: Joi.string()
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
    username: Joi.string().optional(),
    profile_pic: Joi.string().optional(),
    date_of_birth: Joi.date().optional(),
    updateId: Joi.string().required(),


})