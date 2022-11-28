import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, INVENTORY, Users, ITokenData, PLAYLISTS, ROLE } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { generatePublicId, removeFields, getRoleId, setTimesTamp } from '../../common/common-functions';
import { playlistsCreateSchema } from '../../helpers/validation/playlists.validation'
import Playlists from '../../models/playlists.model';
// create inventory here 
export const createHandler = async (req: Request, res: Response) => {
  try {
    await playlistsCreateSchema.validateAsync(req.body);

    const { name, heading, details, tags, category_id, session_count, guide_id, user_id, price, discount_price, total_price, total_playlist_time, thumbnail_url, level, } = req.body;

    //   const findGuide = await Guide.findOne({public_id:guide_id, is_deleted:false})
    //  if(!findGuide){
    //   return res
    //   .status(StatusCodes.NOT_FOUND)
    //   .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));
    //  }
    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin' || 'Guide');
    if (!adminRoleId) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, ROLE.NOT_FOUND, true));
    }
   

    if (!(tokenData.roleId === adminRoleId)){
      return res
      .status(StatusCodes.FORBIDDEN)
      .send(responseGenerators({}, StatusCodes.FORBIDDEN, PLAYLISTS.NO_PERMISSION_CREATE, true))
    }
   
   const createPlaylist =  await Playlists.create({
        public_id: generatePublicId(),
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
        created_by: '',
        created_at: setTimesTamp(),
      });


    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(removeFields(createPlaylist), StatusCodes.OK, PLAYLISTS.CREATED, false));

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
