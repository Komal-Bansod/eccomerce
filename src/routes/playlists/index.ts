import { Router } from 'express';
import { authenticateUser } from '../../middleware';
//import { deleteHandler } from './delete.playlists';
import { getSingleHandler, getListHandler } from './get.playlists';
import { createHandler } from './post.playlists';
import { updateHandler } from './put.playlists';

const PlaylistsRoute = Router();

PlaylistsRoute.use(authenticateUser);

/**
 * @swagger
 * definitions:
 *   commonBadRequestResponse:
 *     example:
 *       data: {}
 *       status_code: 400
 *       status_message: string
 *       response_error: true
 */

/**
 * @swagger
 * definitions:
 *   createPlaylistsResponse:
 *     example:
 *       data:
 *         title: string
 *         quantity: number
 *         min: number
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Playlists:
 *       type: object
 *       required:
 *         - name
 *         - guide_id
 *         - level
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         heading:
 *           type: string
 *           description: heading
 *         details:
 *           type: string
 *           description: details
 *         tags:
 *           type: array
 *           description: tags
 *         category_id:
 *           type: string
 *           description: category_id
 *         session_count:
 *           type: number
 *           description: session_count
 *         guide_id:
 *           type: string
 *           description:  guide_id
 *         user_id:
 *           type: string
 *           description: user_id
 *         price:
 *           type: number
 *           description: price
 *         discount_price:
 *           type: number
 *           description: discount_price
 *         total_price:
 *           type: number
 *           description: total_price
 *         total_playlist_time:
 *           type: number
 *           description: session_count
 *         thumbnail_url:
 *           type: string
 *           description: thumbnail_url
 *         level:
 *           type: string
 *           description: level
 *       example:
 *         name: string
 *         heading: string
 *         details: string
 *         tags: array
 *         category_id: string
 *         session_count: number
 *         guide_id: string
 *         user_id: string
 *         price: number
 *         discount_price: number
 *         total_price: number
 *         total_playlist_time: number
 *         thumbnail_url: string
 *         level: string
 *         is_offline: boolean
 * 
 * 
 */

/**
 * @swagger
 *  tags:
 *    name: Playlists
 *    description: Playlists Document
 */

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: create playlist  for system
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlists'
 *     responses:
 *       200:
 *         description: The playlists successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createPlaylistsResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 PlaylistsRoute.post('/', createHandler);


/**
 * @swagger
 * /api/playlists/list:
 *   get:
 *     summary: Returns all playlists
 *     tags: [Playlists]
 *     parameters: 
 *       - in : query
 *         name: limit
 *         description: limit of page 
 *         schema:
 *           type: integer
 *       - in : query
 *         name: offset
 *         description:  page number
 *         schema:
 *           type: integer
 *       - in : query
 *         name: sort
 *         description: sort
 *         schema:
 *           type: integer
 *       - in : query
 *         name: search
 *         description: search by title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/createPlaylistsResponse'
 *       404:
 *          description: The playlist  not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

 PlaylistsRoute.get('/list', getListHandler);

/**
 * @swagger
 * /api/playlists/{id}:
 *   get:
 *     summary: Get playlist by id
 *     tags: [Playlists]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of playlists
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Playlists by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createPlaylistsResponse'
 *       400:
 *         description: Playlists can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 PlaylistsRoute.get('/:id', getSingleHandler);


/**
 * @swagger
 * components:
 *   schemas:
 *     updatePlaylists:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         heading:
 *           type: string
 *           description: heading
 *         details:
 *           type: string
 *           description: details
 *         tags:
 *           type: array
 *           description: tags
 *         category_id:
 *           type: string
 *           description: category_id
 *         session_count:
 *           type: number
 *           description: session_count
 *         guide_id:
 *           type: string
 *           description:  guide_id
 *         user_id:
 *           type: string
 *           description: user_id
 *         price:
 *           type: number
 *           description: price
 *         discount_price:
 *           type: number
 *           description: discount_price
 *         total_price:
 *           type: number
 *           description: total_price
 *         total_playlist_time:
 *           type: number
 *           description: session_count
 *         thumbnail_url:
 *           type: string
 *           description: thumbnail_url
 *         level:
 *           type: string
 *           description: level
 *       example:
 *         name: string
 *         heading: string
 *         details: string
 *         tags: array
 *         category_id: string
 *         session_count: number
 *         guide_id: string
 *         user_id: string
 *         price: number
 *         discount_price: number
 *         total_price: number
 *         total_playlist_time: number
 *         thumbnail_url: string
 *         level: string
 *         is_offline: boolean
 * 
 * 
 * 
 * 
 */
/**
 * @swagger
 * definitions:
 *   updatePlaylistsResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Update Playlists successfully
 *       response_error: false
 */

/**
 * @swagger
 * /api/playlists/{updateId}:
 *   put:
 *     summary: Update playlist  by id
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: updateId
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlists id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updatePlaylist'
 *     responses:
 *       200:
 *         description: The playlist updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createPlaylistResponse'
 *       404:
 *         description: Playlist can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 PlaylistsRoute.put('/:updateId', updateHandler);

/**
 * @swagger
 * definitions:
 *   deletePlaylistsResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Delete playlist successfully
 *       response_error: false
 */


/**
 * @swagger
 * /api/playlists/{deleteId}:
 *   delete:
 *     summary: Delete playlists by id
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: deleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlists id
 *     responses:
 *       200:
 *         description:  The playlists delete successfully 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/deletePlaylistsResponse'
 *       404:
 *         description: Playlists can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 //PlaylistsRoute.delete('/:deleteId', deleteHandler);



export default  PlaylistsRoute