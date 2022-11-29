import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.sessions';
import { getSingleHandler, getListHandler } from './get.sessions';
import { createHandler } from './post.sessions';
import { updateHandler } from './put.sessions';

const SessionsRoute = Router();

SessionsRoute.use(authenticateUser);

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
 *   createSessionsResponse:
 *     example:
 *       data:
 *         public_id: string
 *         playlist_id: string
 *         room_id: string
 *         name: string
 *         details: string
 *         video_url: array
 *         thumbnail_url: string
 *         price: number
 *         session_start_date_time: string
 *         discount_price: number
 *         total_price: number
 *         is_offline: string
 *         session_host: string
 *         status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sessions:
 *       type: object
 *       required:
 *         - name
 *         - playlist_id
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         playlist_id:
 *           type: string
 *           description: slug
 *         room_id:
 *           type: string
 *           description: room_id
 *         details:
 *           type: string
 *           description: details
 *         video_url:
 *           type: array
 *           description: video_url
 *         thumbnail_url:
 *           type: string
 *           description: thumbnail_url
 *         price:
 *           type: number
 *           description: price
 *         session_start_date_time:
 *           type: string
 *           description: session_start_date_time
 *         discount_price:
 *           type: number
 *           description: discount_price
 *         total_price:
 *           type: number
 *           description: total_price
 *         is_offline:
 *           type: boolean
 *           description: thumbnail_url
 *         session_host:
 *           type: string
 *           description: session_host
 *       example:
 *         playlist_id: string
 *         room_id: string
 *         name: string
 *         details: string
 *         video_url: array
 *         thumbnail_url: string
 *         price: number
 *         session_start_date_time: string
 *         discount_price: number
 *         total_price: number
 *         is_offline: string
 *         session_host: string
 */

/**
 * @swagger
 *  tags:
 *    name: Sessions
 *    description: Session Document
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create session for system
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sessions'
 *     responses:
 *       200:
 *         description: The sessions  successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createSessionsResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 SessionsRoute.post('/', createHandler);


/**
 * @swagger
 * /api/sessions/list:
 *   get:
 *     summary: Returns all sessions
 *     tags: [Sessions]
 *     parameters: 
 *       - in : query
 *         name: limit
 *         description: limit of page  sessions
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
 *         description: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/getSessionsResponse'
 *       404:
 *          description: The sessions  not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

 SessionsRoute.get('/list', getListHandler);

/**
 * @swagger
 * definitions:
 *   getSessionsResponse:
 *     example:
 *       data:
 *         public_id: string
 *         playlist_id: string
 *         room_id: string
 *         name: string
 *         details: string
 *         video_url: array
 *         thumbnail_url: string
 *         price: number
 *         session_start_date_time: string
 *         discount_price: number
 *         total_price: number
 *         is_offline: string
 *         session_host: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Gets sessions by id
 *     tags: [Sessions]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of sessions
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Sessions by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/getSessionsResponse'
 *       400:
 *         description: Sessions can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 SessionsRoute.get('/:id', getSingleHandler);


/**
 * @swagger
 * components:
 *   schemas:
 *     updateSessions:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         playlist_id:
 *           type: string
 *           description: playlist_id
 *         room_id:
 *           type: string
 *           description: room_id
 *         details:
 *           type: string
 *           description: details
 *         video_url:
 *           type: array
 *           description: video_url
 *         thumbnail_url:
 *           type: string
 *           description: thumbnail_url
 *         price:
 *           type: number
 *           description: price
 *         session_start_date_time:
 *           type: string
 *           description: session_start_date_time
 *         discount_price:
 *           type: number
 *           description: discount_price
 *         total_price:
 *           type: number
 *           description: total_price
 *         is_offline:
 *           type: boolean
 *           description: thumbnail_url
 *         session_host:
 *           type: string
 *           description: session_host
 *       example:
 *         playlist_id: string
 *         room_id: string
 *         name: string
 *         details: string
 *         video_url: array
 *         thumbnail_url: string
 *         price: number
 *         session_start_date_time: string
 *         discount_price: number
 *         total_price: number
 *         is_offline: string
 *         session_host: string
 */
/**
 * @swagger
 * definitions:
 *   updateSessionsResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Sessions Updated Successfully
 *       response_error: false
 */

/**
 * @swagger
 * /api/sessions/{updateId}:
 *   put:
 *     summary: Updates sessions by id
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: updateId
 *         schema:
 *           type: string
 *         required: true
 *         description: Sesssions id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateSessions'
 *     responses:
 *       200:
 *         description: The sessions  updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createSessionsResponse'
 *       404:
 *         description: Sessions can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 SessionsRoute.put('/:updateId', updateHandler);

/**
 * @swagger
 * definitions:
 *   deleteSessionsResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Sessions Deleted Successfully
 *       response_error: false
 */



/**
 * @swagger
 * /api/sessions/{deleteId}:
 *   delete:
 *     summary: Delete sessions by id
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: deleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: sessions id
 *     responses:
 *       200:
 *         description: The sessions deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ deleteSessionsResponse'
 *       404:
 *         description: Session can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 SessionsRoute.delete('/:deleteId', deleteHandler);




export default SessionsRoute;
