import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, CATEGORY ,Users , ITokenData } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { generatePublicId, removeFields,getRoleId, setTimesTamp } from '../../common/common-functions';
import { categoryCreateSchema } from '../../helpers/validation/category.validation';
import  Category from '../../models/category.model';



// create user
export const createHandler = async (req: Request, res: Response) => {
  try {
    await categoryCreateSchema .validateAsync(req.body);

    const {name,slug,tags,parent_id,description,feature_image,sort_order} = req.body;
   
    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
   let createCategory 
    if (tokenData.roleId === adminRoleId ) {
    createCategory = await Category.create({
        public_id: generatePublicId(),
        name,
        slug,
        tags,
        parent_id,
        description,
        feature_image,
        sort_order,
        created_by: '',
        created_at: setTimesTamp(),
      });
    }
    if (!createCategory)
    return res
      .status(StatusCodes.FORBIDDEN)
      .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION_CREATE, true));

    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(removeFields(createCategory), StatusCodes.OK, CATEGORY.CREATED, false));
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
