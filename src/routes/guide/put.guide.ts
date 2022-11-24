import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ROLE, Users } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import {  setTimesTamp } from '../../common/common-functions';
import User from '../../models/user.model';
import {userUpdateSchema } from '../../helpers/validation/user.validation'
import UserDetails from '../../models/user-details.model';
// update user
export const updateHandler = async (req: Request, res: Response) => {
  try {
     await userUpdateSchema .validateAsync({ ...req.body, ...req.params });

    const {username,email,mobile,  display_name,gender,date_of_birth, first_name, last_name,address,profile_pic } = req.body;

    const { updateId } = req.params;

    // update user here
    const updateUser = await User.findOneAndUpdate(
      { public_id: updateId,  is_deleted: false },
      {
        mobile,
        updated_at: setTimesTamp(),
        // updated_by: this.request.user.userId,
      },
      { returnOriginal: false },
    );

    if (!updateUser) {
      res.status(StatusCodes.BAD_REQUEST).send(responseGenerators({}, StatusCodes.BAD_REQUEST, Users.NOT_FOUND, true));
    }

    //update user meta data here  
let user_details_id = updateUser.user_details_id
  const updateUserMetaData = await UserDetails.findOneAndUpdate({public_id:user_details_id},{
    display_name,
    gender,
    date_of_birth,
    first_name,
    last_name,
    address,
    profile_pic,
  }, { returnOriginal: false },)


    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, Users.UPDATED, false));
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
