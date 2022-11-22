import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ADMIN, ERROR, ROLE } from '../../common/global-constants';
import Admin from '../../models/admin.model';
import { adminLoginSchema } from '../../helpers/validation/admin.validation';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { generatePublicId, getRoleId, hashPassword, setTimesTamp } from '../../common/common-functions';
import User from '../../models/user.model';
import UserDetails from '../../models/user-details.model';
/**
 * It creates a new admin user
 * @param {Request} req - Request - The request object.
 * @param {Response} res - The response object.
 */
export const createHandler = async (req: Request, res: Response) => {
  try {
  
    await adminLoginSchema.validateAsync(req.body);
    const { first_name, last_name,email, date_of_birth, password, mobile, gender, role_id,username,display_name,address,is_admin,profile_pic,}= req.body;

    const userRoleId = await getRoleId('Admin');
    
    if (!userRoleId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.NOT_FOUND, true));
    }
      // hash the password
      const hashPass = await hashPassword(password);

      // admin create here 
    const adminData = await Admin.create({
      public_id: generatePublicId(),
      first_name,
      last_name,
      email,
      date_of_birth,
      created_by: '',
      created_at: setTimesTamp(),
    });
    
    //here public id generated 
    const newUserMetaDataId = generatePublicId();

    const newUserMetaData = await new UserDetails({
      display_name,
      gender,
      date_of_birth,
      first_name,
      last_name,
      address,
      profile_pic,
      public_id: newUserMetaDataId
    }).save();

    // user create
    const userData = await User.create({
      role_id: userRoleId,
      user_details_id:newUserMetaDataId,
      username,
      email,
      password:hashPass,
      mobile,
      is_admin:true,
      public_id: generatePublicId(),
      created_at: setTimesTamp(),
    });
    return res
      .status(StatusCodes.OK)
      .send(
        responseGenerators({ email: userData.email, id: userData.public_id }, StatusCodes.OK, ADMIN.CREATED, false),
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
