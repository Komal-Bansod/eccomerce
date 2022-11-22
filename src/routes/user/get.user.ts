import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ITokenData,Users, ROLE} from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setPagination } from '../../common/common-functions';
import User from '../../models/user.model';
import { userSingleSchema }from '../../helpers/validation/user.validation'

// get single user
export const getSingleHandler = async (req: Request, res: Response) => {
  try {
    await userSingleSchema.validateAsync(req.params);

    const { id } = req.params;

    const findId = await User.findOne({public_id:id})
    if(!findId){
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, Users.NOT_FOUND, true));
    }

    const tokenData = (req.headers as any).tokenData as ITokenData;

    // get Role id
    const userRoleId = await getRoleId('User');

    if (!userRoleId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.NOT_FOUND, true));
    }

    // get the operator here
    const singleOperator = await User.findOne(
      { public_id: id, is_delete: false, is_active: true, role_id: userRoleId },
      { _id: 0, __v: 0, password: 0 },
    );

    return res.status(StatusCodes.OK).send(responseGenerators(singleOperator, StatusCodes.OK, Users.FETCHED, false));
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

// get list operator
export const getListHandler = async (req: Request, res: Response) => {
  try {
  //  await operatorListSchema.validateAsync(req.query as any);

    const { search } = req.query as any;

    // get Role id
    const userRoleId = await getRoleId('User');

    if (!userRoleId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.NOT_FOUND, true));
    }

    // get pagination
    const pagination = await setPagination(req.query);

    let where = {
      is_deleted: false,
      is_active: true,
      role_id: userRoleId,
    };

    if (search) {
      where = {
        ...where,
        ...{
          username: new RegExp(search.toString(), 'i'),
        },
      };
    }

    // get the operator here
    const listOperator = await User.find(where)
      .sort(pagination.sort)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select({ _id: 0, __v: 0 });

    return res.status(StatusCodes.OK).send(responseGenerators(listOperator, StatusCodes.OK, Users.FETCHED, false));
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
