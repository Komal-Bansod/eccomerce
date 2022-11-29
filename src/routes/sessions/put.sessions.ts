import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, ITokenData, SESSIONS, PLAYLISTS, ROLE } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { sessionsUpdateSchema } from '../../helpers/validation/sessions.validation'
import Sessions from '../../models/sessions.model';
import Playlists from '../../models/playlists.model';


export const updateHandler = async (req: Request, res: Response) => {
  try {
    await sessionsUpdateSchema.validateAsync({ ...req.body, ...req.params });

    const { playlist_id, room_id, name, details, video_url, thumbnail_url, price, session_start_date_time, discount_price, total_price, is_offline, session_host } = req.body;

    const { updateId } = req.params;
    const findSession = await Sessions.findOne({ public_id: updateId })

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
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, SESSIONS.NO_PERMISSION_UPDATE, true))
      }

    if (findGuide)
      if (!((tokenData.roleId === adminRoleId) || (tokenData.guideId === findGuide))) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send(responseGenerators({}, StatusCodes.FORBIDDEN, SESSIONS.NO_PERMISSION_UPDATE, true))
      }

    const updateSessions = await Sessions.findOneAndUpdate({ public_id: updateId }, {
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
      updated_by: '',
      updated_at: setTimesTamp(),
    }, { returnOriginal: false },)


    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, SESSIONS.UPDATED, false));
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
