import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ROLE } from '../../common/global-constants';
import { roleUpdateSchema } from '../../helpers/validation/role.validation';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import Role from '../../models/role.model';
import { setTimesTamp } from '../../common/common-functions';

/**
 * It updates the role with the given id
 * @param {Request} req - Request - The request object.
 * @param {Response} res - The response object.
 */
export const updateHandler = async (req: Request, res: Response) => {
  try {
    await roleUpdateSchema.validateAsync({ ...req.body, ...req.params });

    const { role_name, description, is_active, is_primary, } = req.body;
    const { updateId } = req.params;

    // check role is present or not
    const isAvailable = await Role.findOne({
      role_name,
      public_id: { $ne: updateId },
      is_deleted: false,
    });

    // if exist
    if (isAvailable) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.ALREADY_EXIST, true));
    }

    if (role_name === 'Super Admin' || role_name === 'User') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.CANT_UPDATE_PREDEFINE_ROLE, true));
    }

    // create new role here
    const updatedRole = await Role.findOneAndUpdate(
      { public_id: updateId },
      {
        role_name,
        description,
        is_active,
        is_primary,
        updated_by: '',
        updated_at: setTimesTamp(),
      },
      { new: true },
    );

    return res.status(StatusCodes.OK).send(responseGenerators(updatedRole, StatusCodes.OK, ROLE.UPDATED, false));
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
