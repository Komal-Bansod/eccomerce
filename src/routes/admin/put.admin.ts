import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import {setTimesTamp } from '../../common/common-functions';
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

    const { username, first_name, last_name, date_of_birth } = req.body;

    const { updateId } = req.params;

    // check admin is present or not
    const adminData = await Admin.findOne({
      public_id: updateId,
      is_deleted: false,
    });

    if (!adminData) {
      return res.status(StatusCodes.BAD_REQUEST).send(responseGenerators({}, StatusCodes.BAD_REQUEST, ADMIN.NOT_FOUND, true));
    }

    // update admin table
    const adminDataUpdate = await Admin.findOneAndUpdate(
      { public_id: updateId },
      {
        first_name,
        last_name,
        date_of_birth,      // format yyyy-mm-dd
        updated_by: '',
        updated_at: setTimesTamp(),
      },
    );

    // // update user table
    await User.findOneAndUpdate(
      { guide_id: updateId },
      {
        username
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
