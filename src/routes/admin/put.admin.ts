import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { ADMIN, ERROR, ROLE } from '../../common/global-constants';
import { adminUpdateSchema } from '../../helpers/validation/admin.validation';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import Admin from '../../models/admin.model';
import User from '../../models/user.model';

/**
 * It updates the admin details
 * @param {Request} req - Request - The request object.
 * @param {Response} res - The response object.
 */
export const updateHandler = async (req: Request, res: Response) => {
  try {
    await adminUpdateSchema.validateAsync({ ...req.body, ...req.params });

    const { first_name, last_name, email, date_of_birth } = req.body;

    const { updateId } = req.params;


    // check admin with this email exist or not
    const adminIsAvailable = await User.findOne({
      email,
      is_deleted: false,
      public_id: { $ne: updateId },
    });

    if (adminIsAvailable) {
   return   res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ADMIN.EMAIl_ALREADY_EXIST, true));
    }

    // check admin is present or not
    const adminData = await Admin.findOne({
      email,
      is_deleted: false,
    });

    if (!adminData) {
   return   res.status(StatusCodes.BAD_REQUEST).send(responseGenerators({}, StatusCodes.BAD_REQUEST, ADMIN.NOT_FOUND, true));
    }

    // update user table
    const userData = await User.findOneAndUpdate(
      { public_id: updateId },
      {
        email,
        first_name,
        last_name,
        date_of_birth,
        updated_by: '',
        updated_at: setTimesTamp(),
      },
    );

    // // update admin table
    await Admin.findOneAndUpdate(
      { role_id: userData.role_id},
      {
        email,
        first_name,
        last_name,
        date_of_birth
      },
    );

    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, ADMIN.UPDATED, false));
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
