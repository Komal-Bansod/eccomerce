import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ERROR, CATEGORY, Users,PLAYLISTS, ITokenData, SESSIONS, ROLE } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { sessionsDeleteSchema } from '../../helpers/validation/sessions.validation';
import Sessions from '../../models/sessions.model';
import Playlists from '../../models/playlists.model';

export const deleteHandler = async (req: Request, res: Response) => {
  try {
    await sessionsDeleteSchema .validateAsync(req.params);
    const { deleteId } = req.params;
    const findSession = await Sessions.findOne({ public_id:  deleteId , is_deleted:false})

    if (!findSession) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, SESSIONS.NOT_FOUND, true));
    }
    const findPlaylist = await Playlists.findOne({ public_id: findSession.playlist_id })
    if(!findPlaylist){
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));
    }
    let findGuide = findPlaylist.guide_id
    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
    if (!adminRoleId) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, ROLE.NOT_FOUND, true));
    }

    if (!findGuide)
      if ((tokenData.roleId !== adminRoleId)) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, SESSIONS.NO_PERMISSION_DELETE, true))
      }

    if (findGuide)
      if (!((tokenData.roleId === adminRoleId) || (tokenData.guideId === findGuide))) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, SESSIONS.NO_PERMISSION_DELETE, true))
      }

   const  deleteSession = await Sessions.findOneAndUpdate(
        { public_id: deleteId, is_deleted: false },
        {
          is_deleted: true,
          deleted_at: setTimesTamp(),
          // deleted_by: this.request.user.userId,
        },
        { returnOriginal: false },
      );
    return res.status(StatusCodes.OK).send(responseGenerators(deleteSession, StatusCodes.OK, SESSIONS.DELETED_SUCCESSFULLY, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
