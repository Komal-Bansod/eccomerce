// import { StatusCodes } from 'http-status-codes';
// import { Request, Response } from 'express';
// import { ERROR, Users, ITokenData, PLAYLISTS } from '../../common/global-constants';
// import { logsErrorAndUrl, responseGenerators } from '../../lib';
// import { getRoleId, setTimesTamp } from '../../common/common-functions';
// import { inventoryDeleteSchema} from '../../helpers/validation/inventory.validation'
// import Playlists from '../../models/playlists.model';

// export const deleteHandler = async (req: Request, res: Response) => {
//   try {
//     await inventoryDeleteSchema.validateAsync(req.params);
//     const { deleteId } = req.params;

//    const findGuide = await Guide.findOne({public_id:deleteId})
//    if(!findGuide){
//     return res
//     .status(StatusCodes.NOT_FOUND)
//     .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));
//    }
//     const tokenData = (req.headers as any).tokenData as ITokenData;
//     const adminRoleId = await getRoleId('Admin' || 'Guide');
//    let deletePlaylists
//     if ((tokenData.roleId === adminRoleId) || (tokenData.roleId === findGuide.public_id)) {
//       deletePlaylists = await Playlists.findOneAndUpdate(
//         { public_id: deleteId, is_deleted: false },
//         {
//           is_deleted: true,
//           deleted_at: setTimesTamp()
//         },
//         { returnOriginal: false },
//       );
//       if (!deletePlaylists)
//         return res
//           .status(StatusCodes.NOT_FOUND)
//           .send(responseGenerators({}, StatusCodes.NOT_FOUND, PLAYLISTS.NOT_FOUND, true));
//     }

//     if (!deletePlaylists)
//       return res
//         .status(StatusCodes.FORBIDDEN)
//         .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION, true));


//     return res.status(StatusCodes.OK).send(responseGenerators(deletePlaylists, StatusCodes.OK, PLAYLISTS.DELETED_SUCCESSFULLY, false));
//   } catch (error) {
//     // set logs Error function
//     logsErrorAndUrl(req, error);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
//   }
// };
