import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, REGISTER, ROLE, LOGIN, Users, NOTIFICATION_MESSAGE } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { generatePublicId, getRoleId, hashPassword, removeFields, setTimesTamp, comparePassword, createNotification} from '../../common/common-functions';
import User from '../../models/user.model';
import { userCreateSchema, userChangePasswordSchema } from '../../helpers/validation/user.validation';
import UserDetails from '../../models/user-details.model';
import Role from '../../models/role.model';
import { verifyJwt } from '../../helpers/jwt.helper'


// create user
export const createHandler = async (req: Request, res: Response) => {
  try {
    await userCreateSchema.validateAsync(req.body);

    const { username, email, password, mobile, first_name, last_name, is_admin, role_id } = req.body;

    // get Role id
    const userRoleId = await Role.findOne({ public_id: role_id });

    if (!userRoleId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.NOT_FOUND, true));
    }

    // check email 

    const isEmailExist = await User.findOne({email:email})
    if(isEmailExist){
      return res
      .status(StatusCodes.BAD_REQUEST)
      .send(responseGenerators({}, StatusCodes.BAD_REQUEST, Users.EMAIL_ALREADY_EXIST, true));
    }
    // hash the password
    const hashPass = await hashPassword(password);

    const newUserMetaDataId = generatePublicId();

    const newUserMetaData = await new UserDetails({
      first_name,
      last_name,
      public_id: newUserMetaDataId
    }).save();


    if (userRoleId.role_name === 'Admin') {
      const newUser = await new User({
        role_id: userRoleId.public_id,
        user_details_id: newUserMetaDataId,
        username,
        email,
        password: hashPass,
        mobile,
        is_admin: true,
        public_id: generatePublicId(),
        created_at: setTimesTamp(),

      }).save()

      createNotification( newUser.public_id,NOTIFICATION_MESSAGE.CREATE_USER)

      return res
        .status(StatusCodes.OK)
        .send(responseGenerators(removeFields(newUser), StatusCodes.OK, REGISTER.SUCCESS, false));
    }

    // create new user here
    const newUser = await new User({
      role_id: userRoleId.public_id,
      user_details_id: newUserMetaDataId,
      username,
      email,
      password: hashPass,
      mobile,
      is_admin,
      public_id: generatePublicId(),
      created_at: setTimesTamp(),

    }).save();
    createNotification( newUser.public_id,NOTIFICATION_MESSAGE.CREATE_USER)


    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(removeFields(newUser), StatusCodes.OK, REGISTER.SUCCESS, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    if (error instanceof ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send(responseValidation(StatusCodes.BAD_REQUEST, error.message, true));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};

// create change Password
export const createChangePasswordHandler = async (req: Request, res: Response) => {
  try {

    await userChangePasswordSchema .validateAsync(req.body);
    const { newPassword, currentPassword } = req.body
  
    const { authorization } = req.headers;
    const tokenData = await verifyJwt(authorization);

    let findUser = await User.findOne({ email: tokenData.email, public_id: tokenData.userId })

    if (!findUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(responseValidation(StatusCodes.UNAUTHORIZED, Users.NOT_FOUND, true));
    }

    const isMatch = await comparePassword(currentPassword, findUser.password);

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(responseValidation(StatusCodes.UNAUTHORIZED, LOGIN.INVALID_CRED, true));
    }
    // hash the password
    const hashPass = await hashPassword(newPassword)
    const changePassword = await User.findOneAndUpdate(
      { public_id: findUser.public_id },
      {
        password: hashPass,
        update_at: setTimesTamp(),
      },
    )
    createNotification(findUser.public_id ,NOTIFICATION_MESSAGE.RESET_PASSWORD)

    return res.status(StatusCodes.OK).send(responseGenerators(changePassword, StatusCodes.OK, REGISTER.PASSWORD_CHANGE, false));

  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    if (error instanceof ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send(responseValidation(StatusCodes.BAD_REQUEST, error.message, true));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};