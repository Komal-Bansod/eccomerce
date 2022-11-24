import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR,INVENTORY,Users , ITokenData } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { generatePublicId, removeFields,getRoleId, setTimesTamp } from '../../common/common-functions';
import  Inventory from '../../models/inventory.model';
import { inventoryCreationSchema} from '../../helpers/validation/inventory.validation'
// create inventory here 
export const createHandler = async (req: Request, res: Response) => {
  try {
    await inventoryCreationSchema .validateAsync(req.body);

    const {title, quantity, min} = req.body;
   
    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
   let createInventory
    if (tokenData.roleId === adminRoleId ) {
    createInventory = await Inventory.create({
        public_id: generatePublicId(),
        title,
        quantity,
        min,
        created_by: '',
        created_at: setTimesTamp(),
      });
    }
    if (!createInventory)
    return res
      .status(StatusCodes.FORBIDDEN)
      .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION_CREATE, true));

    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(removeFields(createInventory), StatusCodes.OK, INVENTORY.CREATED, false));

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
