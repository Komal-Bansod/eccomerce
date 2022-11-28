import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR,  Users, ITokenData, PLAYLISTS, ROLE } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { getRoleId, setTimesTamp } from '../../common/common-functions';
import { playlistsCreateSchema } from '../../helpers/validation/playlists.validation'
import Playlists from '../../models/playlists.model';
import Guide from '../../models/guide.model';
;

export const updateHandler = async (req: Request, res: Response) => {
  try {
    await playlistsCreateSchema.validateAsync({ ...req.body, ...req.params });
    

    const { name,heading, details,tags,category_id, session_count, guide_id,user_id, price,  discount_price, total_price , total_playlist_time, thumbnail_url,  level } = req.body;

    const { updateId } = req.params;
   
    const findPlaylist = await Playlists.findOne({public_id: updateId, is_deleted: false})
    if (!findPlaylist)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));
  
 
   const findGuide = await Guide.findOne({public_id:findPlaylist.guide_id})
  
    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
    if (!adminRoleId) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, ROLE.NOT_FOUND, true));
    }
  
    if(!findGuide)
    if ((tokenData.roleId !== adminRoleId)){
      return res
      .status(StatusCodes.FORBIDDEN)
      .send(responseGenerators({}, StatusCodes.FORBIDDEN, PLAYLISTS.NO_PERMISSION_DELETE, true))
    }
   
    if(findGuide)
    if (((tokenData.roleId !== adminRoleId)|| (tokenData.roleId !== findGuide.role_id))){
      return res
      .status(StatusCodes.FORBIDDEN)
      .send(responseGenerators({}, StatusCodes.FORBIDDEN, PLAYLISTS.NO_PERMISSION_CREATE, true))
    }
    const  updatePlaylists = await Playlists.findOneAndUpdate({ public_id: updateId }, {
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
