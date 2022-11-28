import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { getSingleHandler, getListHandler } from './get.notification';
import { createHandler } from './post.notification';


const NotificationRoute = Router();

NotificationRoute.use(authenticateUser);

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
 *   createNotificationResponse:
 *     example:
 *       data:
 *         user_id: string
 *         message: string
 *         is_active: boolean
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - user_id
 *         - message
 *       properties:
 *         user_id:
 *           type: string
 *           description: user_id
 *         message:
 *           type: string
 *           description: message
 *       example:
 *         user_id: string
 *         message: string
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Notification
 *    description: NotificationDocument
 */

/**
 * @swagger
 * /api/notification:
 *   post:
 *     summary: Create notification for system
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: The notification  successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createNotificationResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
NotificationRoute.post('/', createHandler);


/**
* @swagger
* definitions:
*   getNotificationResponse:
*     example:
*       data:
*         public_id: string
*         user_id: string
*         message: string
*         created_at: string
*       status_code: 200
*       status_message: string
*       response_error: false
*/


/**
 * @swagger
 * /api/notification/list:
 *   get:
 *     summary: Returns all notification
 *     tags: [Notification]
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
 *         description: search 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of  notification
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/getNotificationResponse'
 *       404:
 *          description: The notification not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

NotificationRoute.get('/list', getListHandler);


/**
 * @swagger
 * /api/notification/{id}:
 *   get:
 *     summary: Get notification by id
 *     tags: [Notification]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: Id of notification module
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Notification  by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/getNotificationResponse'
 *       400:
 *         description: Notification not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
NotificationRoute.get('/:id', getSingleHandler);





export default NotificationRoute;
