import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ADMIN, ERROR } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import Admin from '../../models/admin.model';
import User from '../../models/user.model';
import { setTimesTamp } from '../../common/common-functions';

/**
 * It deletes the admin from the database
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object that will be sent back to the client.
 */
export const deleteHandler = async (req: Request, res: Response) => {
  try {
    const { deleteId } = req.params;

    // delete from user table
    const userUpdate = await User.findOneAndUpdate(
      { public_id: deleteId },
      {
        is_deleted: true,
        deleted_by: '',
        deleted_at: setTimesTamp(),
      },
    );

    // delete from admin table
    const adminData = await Admin.findOneAndUpdate(
      { public_id: userUpdate.is_admin },
      {
        is_deleted: true,
      },
    );

    if (!userUpdate || !adminData) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ADMIN.NOT_DELETED, true));
    }

    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, ADMIN.DELETED_SUCCESSFULLY, false));
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
