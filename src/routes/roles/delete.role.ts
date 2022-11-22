import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ROLE } from '../../common/global-constants';
import { roleDeleteSchema } from '../../helpers/validation/role.validation';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import Role from '../../models/role.model';
import User from '../../models/user.model';
import { setTimesTamp } from '../../common/common-functions';

// for deleting the role
/**
 * It deletes a role from the database
 * @param {Request} req - Request - The request object.
 * @param {Response} res - The response object.
 * @returns a response object.
 */
// default user/admin
export const deleteHandler = async (req: Request, res: Response) => {
  try {
    await roleDeleteSchema.validateAsync(req.params);
    const { deleteId } = req.params;

    // check user is present with this role
    const isUserWithRole = await User.findOne({
      role_id: deleteId,
      is_deleted: false,
    });

    // user exist can't delete the role
    if (isUserWithRole) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.CANT_DELETE, true));
    }

    const roleData = await Role.findOne({ public_id: deleteId });

    if (roleData) {
      if (roleData.role_name === 'Super Admin' || roleData.role_name === 'Operator' || roleData.role_name === 'User') {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.CANT_UPDATE_PREDEFINE_ROLE, true));
      }
    }

    // delete the role here
    const deletedRole = await Role.findOneAndUpdate(
      { public_id: deleteId },
      {
        is_deleted: true,
        deleted_by: '',
        deleted_at: setTimesTamp(),
      },
    );

    return res.status(StatusCodes.OK).send(responseGenerators(deletedRole, StatusCodes.OK, ROLE.DELETED, false));
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
