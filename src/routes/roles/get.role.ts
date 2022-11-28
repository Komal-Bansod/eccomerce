import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { setPagination } from '../../common/common-functions';
import { ERROR, ROLE } from '../../common/global-constants';
import { roleSingleSchema } from '../../helpers/validation/role.validation';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import Role from '../../models/role.model';

// get single role
/**
 * It gets a single role from the database
 * @param {Request} req - Request - This is the request object that contains the request data.
 * @param {Response} res - Response - This is the response object that will be sent back to the client.
 * @returns A single role
 */
export const getSingleHandler = async (req: Request, res: Response) => {
  try {
    await roleSingleSchema.validateAsync(req.params);

    const { id } = req.params;

    // get the role here
    const singleRole = await Role.findOne({ public_id: id });
    if (!singleRole) {
      return res.status(StatusCodes.BAD_REQUEST).send(responseGenerators(null, StatusCodes.BAD_REQUEST, ROLE.NOT_FOUND, true))
    }

    return res.status(StatusCodes.OK).send(responseGenerators(singleRole, StatusCodes.OK, ROLE.FOUND, false));
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

/**
 * It gets the list of roles from the database
 * @param {Request} req - Request - this is the request object that contains the request data
 * @param {Response} res - Response - this is the response object that will be sent back to the client.
 */
export const getListHandler = async (req: Request, res: Response) => {
  try {
    const { search } = req.query as any;

    // get pagination
    const pagination = await setPagination(req.query);

    let where = {
      is_deleted: false,
    };

    if (search) {
      where = {
        ...where,
        ...{
          role_name: new RegExp(search.toString(), 'i'),
        },
      };
    }

    // get the role here
    const listRole = await Role.find(where)
      .sort(pagination.sort)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select({ _id: 0 });

    const dataCount = await Role.count(where);

    const resData = {
      dataCount,
      list: listRole,
    };

    return res.status(StatusCodes.OK).send(responseGenerators(resData, StatusCodes.OK, ROLE.FOUND, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
