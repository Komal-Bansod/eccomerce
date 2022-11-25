import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ROLE,  NOTIFICATION_MESSAGE, GUIDE, Users } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, } from '../../lib';
import { generatePublicId, getRoleId, hashPassword,setTimesTamp, comparePassword, createNotification} from '../../common/common-functions';
import User from '../../models/user.model';
import { guideCreateSchema} from '../../helpers/validation/guide.validation';
import UserDetails from '../../models/user-details.model';
import { verifyJwt } from '../../helpers/jwt.helper'
import Guide from '../../models/guide.model';


// create  guide 
export const createHandler = async (req: Request, res: Response) => {
  try {
 await guideCreateSchema.validateAsync(req.body);

    const {personal_details, contact_details,address,company_details,job_history,other_certificates,password} = req.body;

    const userRoleId = await getRoleId('Guide');
    
    if (!userRoleId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.NOT_FOUND, true));
    }
      // hash the password
      if(password){
      var hashPass = await hashPassword(password);
      }

      const isEmailExist = await User.findOne({email:contact_details.employee_email_personal,})
      if(isEmailExist){
        return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, Users.EMAIL_ALREADY_EXIST, true));
      }
    // create guide  here
    const newGuide = await Guide.create ({
      public_id: generatePublicId(),
      role_id:userRoleId ,
      personal_details,
      contact_details,
      address,
      company_details,
      job_history,
      other_certificates,
      created_by: '',
      created_at: setTimesTamp(),

    })
    
    const newUserMetaDataId = generatePublicId();

    const newUserMetaData = await new UserDetails({
      display_name: newGuide.personal_details.first_name,
      gender:newGuide.personal_details.gender,
      date_of_birth:newGuide.personal_details.date_of_birth,
      first_name:newGuide.personal_details.first_name,
      last_name: newGuide.personal_details.last_name,
      address:newGuide.address ,
      profile_pic:newGuide.personal_details.profile_pic ,
      public_id: newUserMetaDataId
    }).save()


    // user create
    const userData = await User.create({
      guide_id: newGuide.public_id,
      role_id: userRoleId,
      user_details_id:newUserMetaDataId,
      username: newGuide.personal_details.first_name,
      email: newGuide.contact_details.employee_email_personal,
      password:hashPass,
      mobile : newGuide.contact_details.mobile,
      public_id: generatePublicId(),
      created_at: setTimesTamp(),
    });
    createNotification( userData.public_id,NOTIFICATION_MESSAGE.CREATE_USER)


    return res
      .status(StatusCodes.OK)
      .send(
        responseGenerators({ email: userData.email, id: newGuide.public_id }, StatusCodes.OK, GUIDE.CREATED, false),
      );
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, error.message, true));
    }

    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
