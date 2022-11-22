import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ERROR, ITokenData, ROLE, Users } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { userDeleteSchema } from '../../helpers/validation/user.validation';
import User from '../../models/user.model';

export const deleteHandler = async (req: Request, res: Response) => {
  try {
    await userDeleteSchema.validateAsync(req.params);
    const { deleteId } = req.params;
 
    const tokenData = (req.headers as any).tokenData as ITokenData;
  
    // get Admin role 
const adminRoleId = await getRoleId('Admin');

    // get Role id for user 
    const userRoleId = await getRoleId('User');
    if (!userRoleId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, ROLE.NOT_FOUND, true));
    }

    let deleteUser = ''

    if (tokenData.roleId=== adminRoleId ) {
      deleteUser = await User.findOneAndUpdate(
        { public_id: deleteId, is_deleted: false, role_id: userRoleId },
        {
          is_deleted: true,
          deleted_at: setTimesTamp(),
          // deleted_by: this.request.user.userId,
        },
        { returnOriginal: false },
      );
    }

    if (!deleteUser)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION, true));

    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, Users.DELETED, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
