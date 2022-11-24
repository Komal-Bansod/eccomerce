import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ERROR, Users, ITokenData, PRODUCT } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { productDeleteSchema } from '../../helpers/validation/product.validation';
import Product from '../../models/product.model';

export const deleteHandler = async (req: Request, res: Response) => {
  try {
    await productDeleteSchema.validateAsync(req.params);
    const { deleteId } = req.params;

    const tokenData = (req.headers as any).tokenData as ITokenData;


    const adminRoleId = await getRoleId('Admin');

    let deleteProduct
    if (tokenData.roleId === adminRoleId) {
      deleteProduct = await Product.findOneAndUpdate(
        { public_id: deleteId, is_deleted: false },
        {
          is_deleted: true,
          deleted_at: setTimesTamp()
        },
        { returnOriginal: false },
      );
      if (!deleteProduct)
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(responseGenerators({}, StatusCodes.NOT_FOUND, PRODUCT.NOT_FOUND, true));
    }

    if (!deleteProduct)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION, true));


    return res.status(StatusCodes.OK).send(responseGenerators(deleteProduct, StatusCodes.OK, PRODUCT.DELETED_SUCCESSFULLY, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
