import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ERROR, GUIDE, ITokenData, ROLE, Users } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { guideDeleteSchema } from '../../helpers/validation/guide.validation';
import User from '../../models/user.model';
import Guide from '../../models/guide.model';

export const deleteHandler = async (req: Request, res: Response) => {
  try {
    await guideDeleteSchema.validateAsync(req.params);
    const { deleteId } = req.params;

    const tokenData = (req.headers as any).tokenData as ITokenData;

    // get Admin role 
    const adminRoleId = await getRoleId('Admin');
    if (tokenData.roleId != adminRoleId)
    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, Users.NO_PERMISSION_DELETE, false));

    const findGuideId = await Guide.findOne({ public_id: deleteId })
    const findGuideUser = await User.findOne({ guide_id: deleteId })
    if (!findGuideUser || !findGuideId) {
      return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, GUIDE.NOT_FOUND, false));
    }

    await Guide.findOneAndUpdate(
      { public_id: deleteId, is_deleted: false },
      {
        is_deleted: true,
        deleted_at: setTimesTamp(),
        
      },
      { returnOriginal: false },
    );
    await User.findOneAndUpdate(
      { guide_id: deleteId, is_deleted: false },
      {
        is_deleted: true,
        deleted_at: setTimesTamp()
      },
      { returnOriginal: false },
    );

    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, GUIDE.DELETED_SUCCESSFULLY, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
