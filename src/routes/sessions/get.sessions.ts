import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ITokenData,Users, ROLE, CATEGORY, SESSIONS} from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setPagination } from '../../common/common-functions';

import { sessionsSingleSchema }from '../../helpers/validation/sessions.validation'
import Sessions from '../../models/session.model';

// get single Category
export const getSingleHandler = async (req: Request, res: Response) => {
  try {
    await sessionsSingleSchema.validateAsync(req.params);

    const { id } = req.params;

    const findId = await Sessions.findOne({public_id:id})
    if(!findId){
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, SESSIONS.NOT_FOUND, true));
    }

    return res.status(StatusCodes.OK).send(responseGenerators(findId, StatusCodes.OK, SESSIONS.FOUND, false));
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

// get list session

export const getListHandler = async (req: Request, res: Response) => {
  try {

const { search } = req.query as any;

    // get pagination
    const pagination = await setPagination(req.query);

    let where = {
      is_deleted: false 
    };

    if (search) {
      where = {
        ...where,
        ...{
          $expr: {
            $regexMatch: {
              input: {
                $concat: ['$name', ' ', '$slug'],
              },
              regex: search.toString(),
              options: 'i',
            },
          },
        },
      };
    }

    // get the session here
    const listSession = await Sessions.find(where)
      .sort(pagination.sort)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select({ _id: 0, __v: 0 });

    return res.status(StatusCodes.OK).send(responseGenerators(listSession, StatusCodes.OK, SESSIONS.FOUND, false));
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
