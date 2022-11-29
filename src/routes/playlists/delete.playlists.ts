import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ERROR, Users, ITokenData, PLAYLISTS, ROLE } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import Playlists from '../../models/playlists.model';
import { playlistsDeleteSchema } from '../../helpers/validation/playlists.validation'
import Guide from '../../models/guide.model'
export const deleteHandler = async (req: Request, res: Response) => {
  try {

    await playlistsDeleteSchema.validateAsync(req.params);
    const { deleteId } = req.params;

    //check plalist is present or not
    const findPlaylist = await Playlists.findOne({ public_id: deleteId, is_deleted: false })
    if (!findPlaylist)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));

    // find guide 
    const findGuide = await Guide.findOne({ public_id: findPlaylist.guide_id })

    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
    if (!adminRoleId) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, ROLE.NOT_FOUND, true));
    }
    if (!findGuide)
      if (tokenData.roleId !== adminRoleId) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, PLAYLISTS.NO_PERMISSION_DELETE, true))
      }
    if (findGuide)
      if (!((tokenData.roleId === adminRoleId) || (tokenData.guideId === findGuide.public_id))) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, PLAYLISTS.NO_PERMISSION_DELETE, true))
      }

    const deletePlaylists = await Playlists.findOneAndUpdate(
      { public_id: deleteId, is_deleted: false },
      {
        is_deleted: true,
        deleted_at: setTimesTamp()
      },
      { returnOriginal: false },
    );
    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, PLAYLISTS.DELETED_SUCCESSFULLY, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
}
