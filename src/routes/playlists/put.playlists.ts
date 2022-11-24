import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR,  Users, ITokenData, PLAYLISTS } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { playlistsCreateSchema } from '../../helpers/validation/playlists.validation'
import Playlists from '../../models/playlists.model';
;

export const updateHandler = async (req: Request, res: Response) => {
  try {
    await playlistsCreateSchema.validateAsync({ ...req.body, ...req.params });
    

    const { name,heading, details,tags,category_id, session_count, guide_id,user_id, price,  discount_price, total_price , total_playlist_time, thumbnail_url,  level } = req.body;

    const { updateId } = req.params;
    const adminRoleId = await getRoleId('Admin' || 'Guide');
    const findGuide = await Guide.findOne({public_id:guide_id})
   if(!findGuide){
    return res
    .status(StatusCodes.NOT_FOUND)
    .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));
   }
    const tokenData = (req.headers as any).tokenData as ITokenData;
 
   let updatePlaylists
    if ((tokenData.roleId === adminRoleId) || (tokenData.roleId === findGuide.public_id)) {
      updatePlaylists = await Playlists.findOneAndUpdate({ public_id: updateId }, {
        name,
        heading,
        details,
        tags,
        category_id,
        session_count,
        guide_id,
        user_id,
        price,
        discount_price,
        total_price,
        total_playlist_time,
        thumbnail_url,
        level,
        updated_by: '',
        updated_at: setTimesTamp(),
      }, { returnOriginal: false },)

      if (!updatePlaylists) {
        return res.status(StatusCodes.BAD_REQUEST).send(responseGenerators(null, StatusCodes.BAD_REQUEST, PLAYLISTS.NOT_FOUND, true))
      }
    }
    if (!updatePlaylists)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION_UPDATE, true));


    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, PLAYLISTS.UPDATED, false));
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
