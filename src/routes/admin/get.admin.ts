import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ADMIN, ERROR } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { setPagination } from '../../common/common-functions';
import Admin from '../../models/admin.model';

/**
 * It gets a single admin user from the database
 * @param {Request} req - Request - This is the request object that contains the request data.
 * @param {Response} res - Response - This is the response object that will be sent back to the client.
 */
export const getSingleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const adminData = await Admin.findOne({
      public_id: id,
      is_deleted: false,
    }).select({ password: 0 });

    if (!adminData) {
     return  res.status(StatusCodes.BAD_REQUEST).send(responseGenerators({}, StatusCodes.BAD_REQUEST, ADMIN.NOT_FOUND, true));
    }

    return res.status(StatusCodes.OK).send(responseGenerators(adminData, StatusCodes.OK, ADMIN.FOUND, false));
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
          first_name: new RegExp(search.toString(), 'i'),
        },
      };
    }

    // get the role here
    const listRole = await Admin.find(where)
      .sort(pagination.sort)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select({ _id: 0 });

    const dataCount = await Admin.count(where);

    const resData = {
      dataCount,
      list: listRole,
    };

    return res.status(StatusCodes.OK).send(responseGenerators(resData, StatusCodes.OK, ADMIN.FOUND, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};