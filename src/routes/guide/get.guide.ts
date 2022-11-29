import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ITokenData, Users, ROLE, GUIDE } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setPagination } from '../../common/common-functions';
import { guideSingleSchema } from '../../helpers/validation/guide.validation'
import Guide from '../../models/guide.model';

// get single user
export const getSingleHandler = async (req: Request, res: Response) => {
  try {
    await guideSingleSchema.validateAsync(req.params);

    const { id } = req.params;

    const findId = await Guide.findOne({ public_id: id })
    if (!findId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, GUIDE.NOT_FOUND, true));
    }

    const singleGuide = await Guide.findOne(
      { public_id: id, is_delete: false },
      { _id: 0, __v: 0, password: 0 },
    );

    return res.status(StatusCodes.OK).send(responseGenerators(singleGuide, StatusCodes.OK, GUIDE.FOUND, false));
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

// get list Guide
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
          'personal_details.first_name': new RegExp(search.toString(), 'i'),
        },
      };
    }

    // get the Guide here
    const listGuide = await Guide.find(where)
      .sort(pagination.sort)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select({ _id: 0, __v: 0 });

    return res.status(StatusCodes.OK).send(responseGenerators(listGuide, StatusCodes.OK, GUIDE.FOUND, false));
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
