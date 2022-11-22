import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, CATEGORY ,Users , ITokenData} from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId,setTimesTamp } from '../../common/common-functions';
import { categoryUpdateSchema } from '../../helpers/validation/category.validation'
import Category from '../../models/category.model';


export const updateHandler = async (req: Request, res: Response) => {
  try {
    await categoryUpdateSchema.validateAsync({ ...req.body, ...req.params });

    const { name, slug, tags, parent_id, description, feature_image, sort_order } = req.body;

    const { updateId } = req.params;
    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
    let updateCategory
    if (tokenData.roleId === adminRoleId ) {
     updateCategory = await Category.findOneAndUpdate({ public_id: updateId }, {
      name,
      slug,
      tags,
      parent_id,
      description,
      feature_image,
      sort_order,
      updated_by: '',
      updated_at: setTimesTamp(),
    }, { returnOriginal: false },)

    if (!updateCategory) {
      return res.status(StatusCodes.BAD_REQUEST).send(responseGenerators(null, StatusCodes.BAD_REQUEST, CATEGORY.NOT_FOUND, true))
    }
  }
  if (!updateCategory)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION_UPDATE, true));
  

    return res.status(StatusCodes.OK).send(responseGenerators(updateCategory, StatusCodes.OK, CATEGORY.UPDATED, false));
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
