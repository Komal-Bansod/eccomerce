import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, CATEGORY ,Users , ITokenData, SESSIONS, ROLE, PLAYLISTS } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { generatePublicId, removeFields,getRoleId, setTimesTamp } from '../../common/common-functions';
import { sessionsCreateSchema } from '../../helpers/validation/sessions.validation';
import  Sessions from '../../models/sessions.model';
import Playlists from '../../models/playlists.model';



// create session
export const createHandler = async (req: Request, res: Response) => {
  try {
    await sessionsCreateSchema .validateAsync(req.body);

    const { playlist_id, room_id,name, details, video_url,thumbnail_url,price,session_start_date_time, discount_price,total_price,is_offline,session_host} = req.body;
    const findPlaylist= await Playlists.findOne({ public_id:  playlist_id})
    if(!findPlaylist){
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));
    }
      const findGuide = findPlaylist.guide_id
    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
    if (!adminRoleId) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, ROLE.NOT_FOUND, true));
    }

    if (!findGuide)
      if ((tokenData.roleId !== adminRoleId) ) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, SESSIONS.NO_PERMISSION_CREATE, true))
      }

    if (findGuide)
      if (!((tokenData.roleId === adminRoleId) || (tokenData.guideId === findGuide))) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, SESSIONS.NO_PERMISSION_CREATE, true))
      }
   
   const createSession = await Sessions.create({
        public_id: generatePublicId(),
        playlist_id,
        room_id,
        name,
        details,
        video_url,
        thumbnail_url,
        price,
        session_start_date_time,
        discount_price,
        total_price,
        is_offline,
        session_host,
        created_by: '',
        created_at: setTimesTamp(),
      });

    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(removeFields(createSession), StatusCodes.OK, SESSIONS.CREATED, false));
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
