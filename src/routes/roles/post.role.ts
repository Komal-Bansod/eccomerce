import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { generatePublicId, setTimesTamp } from '../../common/common-functions';
import { ERROR, ROLE } from '../../common/global-constants';
import { roleCreationSchema } from '../../helpers/validation/role.validation';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import Role from '../../models/role.model';

/**
 * It creates a new role
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object that will be sent back to the client.
 */
export const createHandler = async (req: Request, res: Response) => {
  try {
    await roleCreationSchema.validateAsync(req.body);

    const { role_name, description, permission  } = req.body;

    // check role is present or not
    const isAvailable = await Role.findOne({
      role_name,
      is_deleted: false,
    });

    // if exist
    if (isAvailable) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.ALREADY_EXIST, true));
    }

    // create new role here
    const newRole = await Role.create({
      public_id: generatePublicId(),
      role_name,
      description,
      permission ,
      is_primary:true,
      is_active: true,
      created_by: '',
      created_at: setTimesTamp(),
    });

    return res.status(StatusCodes.OK).send(responseGenerators(newRole, StatusCodes.OK, ROLE.CREATED, false));
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
