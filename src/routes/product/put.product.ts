import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR,  Users, ITokenData, INVENTORY } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { productUpdateSchema } from '../../helpers/validation/product.validation';
import Inventory from '../../models/inventory.model';

export const updateHandler = async (req: Request, res: Response) => {
  try {
    await productUpdateSchema.validateAsync({ ...req.body, ...req.params });

    const {title, quantity, min_quantity} = req.body;

    const { updateId } = req.params;


    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');

    
    let updateInventory
    if (tokenData.roleId === adminRoleId) {
      updateInventory = await Inventory.findOneAndUpdate({ public_id: updateId }, {
        title,
        quantity,
        min_quantity,
        updated_by: '',
        updated_at: setTimesTamp(),
      }, { returnOriginal: false },)

      if (!updateInventory) {
        return res.status(StatusCodes.BAD_REQUEST).send(responseGenerators(null, StatusCodes.BAD_REQUEST, INVENTORY.NOT_FOUND, true))
      }
    }
    if (!updateInventory)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION_UPDATE, true));


    return res.status(StatusCodes.OK).send(responseGenerators(updateInventory, StatusCodes.OK, INVENTORY.UPDATED, false));
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
