import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ITokenData,Users, ROLE, CATEGORY} from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setPagination } from '../../common/common-functions';
import Category from '../../models/category.model';
import { categorySingleSchema }from '../../helpers/validation/category.validation'

// get single Category
export const getSingleHandler = async (req: Request, res: Response) => {
  try {
    await categorySingleSchema.validateAsync(req.params);

    const { id } = req.params;

    const findId = await Category.findOne({public_id:id})
    if(!findId){
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, CATEGORY.NOT_FOUND, true));
    }

    return res.status(StatusCodes.OK).send(responseGenerators(findId, StatusCodes.OK, CATEGORY.FOUND, false));
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

// get list Category 

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

    // get the category here
    const listCategory = await Category.find(where)
      .sort(pagination.sort)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select({ _id: 0, __v: 0 });

    return res.status(StatusCodes.OK).send(responseGenerators(listCategory, StatusCodes.OK, CATEGORY.FOUND, false));
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
