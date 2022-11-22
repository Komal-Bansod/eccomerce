import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ERROR, CATEGORY, Users, ITokenData } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { userDeleteSchema } from '../../helpers/validation/user.validation';
import Category from '../../models/category.model';

export const deleteHandler = async (req: Request, res: Response) => {
  try {
    await userDeleteSchema.validateAsync(req.params);
    const { deleteId } = req.params;

    const tokenData = (req.headers as any).tokenData as ITokenData;


    const adminRoleId = await getRoleId('Admin');

    let deleteUser
    if (tokenData.roleId === adminRoleId) {
      deleteUser = await Category.findOneAndUpdate(
        { public_id: deleteId, is_deleted: false },
        {
          is_deleted: true,
          deleted_at: setTimesTamp(),
          // deleted_by: this.request.user.userId,
        },
        { returnOriginal: false },
      );
      if (!deleteUser)
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(responseGenerators({}, StatusCodes.NOT_FOUND, CATEGORY.NOT_FOUND, true));
    }

    if (!deleteUser)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION, true));


    return res.status(StatusCodes.OK).send(responseGenerators(deleteUser, StatusCodes.OK, CATEGORY.DELETED_SUCCESSFULLY, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
