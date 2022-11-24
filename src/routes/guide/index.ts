import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.guide';
import { getListHandler, getSingleHandler } from './get.guide';
import { createHandler, createChangePasswordHandler } from './post.guide';
import { updateHandler } from './put.guide';

const GuideRoute = Router();

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
 * components:
 *   schemas:
 *     Guide:
 *       type: object
 *       required:
 *         - username
 *         - first_name
 *         - last_name
 *         - mobile
 *         - email
 *         - password
 *         - role_id
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         mobile:
 *           type: string
 *           description: user mobile number
 *         last_name:
 *           type: string
 *           description: user last name
 *         first_name:
 *           type: string
 *           description: user first_name
 *         email:
 *           type: string
 *           description: user email
 *         password:
 *           type: string
 *           description: user password
 *       example:
 *         username: string
 *         role_id: string
 *         first_name: string
 *         last_name: string
 *         password: string
 *         mobile: string
 *         email: string
 */
/**
 * @swagger
 *  tags:
 *    name: Guide
 *    description: Guide Document
 */


/**
 * @swagger
 * definitions:
 *   guideResponse:
 *     example:
 *       data:
 *         first_name: string
 *         last_name: string
 *         email: string
 *         mobile: string
 *         password: string
 *         role_id: string
 *         is_admin_id: boolean
 *         user_details_id: string
 *         created_by: string
 *         updated_by: string
 *         deleted_by: string
 *         is_deleted: string
 *         created_at: string
 *         updated_at: string
 *         deleted_at: string
 *       status_code: 201
 *       status_message: Guide Created successfully
 *       response_error: false
 */

/**
 *
 * @swagger
 * /api/guide:
 *   post:
 *     summary: Create Guide
 *     tags: [Guide]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guide'
 *     responses:
 *       201:
 *         description: The guide was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/guideResponse'
 *       404:
 *         description: Guide can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */


GuideRoute.post('/', createHandler); // Create Guide 
GuideRoute.use(authenticateUser);

/**
 * @swagger
 * definitions:
 *   guideGetResponse:
 *     example:
 *       data:
 *         email: string
 *         mobile: string
 *         password: string
 *         role_id: string
 *         is_admin_id: boolean
 *         user_details_id: string
 *         is_active: string
 *         is_block: boolean
 *         twoFA_enable: string
 *         created_by: string
 *         updated_by: string
 *         deleted_by: string
 *         is_deleted: string
 *         created_at: string
 *         updated_at: string
 *         deleted_at: string
 *       status_code: 200
 *       status_message: Guide List Retrieved Successfully
 *       response_error: false
 */
/**
 * @swagger
 * /api/guide:
 *   get:
 *     summary: Return All guide
 *     tags: [Guide]
 *     parameters: 
 *       - in : query
 *         name: limit
 *         description: limit of page  guide
 *         schema:
 *           type: integer
 *       - in : query
 *         name: offset
 *         description:  page number  guide
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
 *         description: Get the list of the guide
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/guideGetResponse'
 *       404:
 *          description: The guide was not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
GuideRoute.get('/', getListHandler);

/**
  * @swagger
  * /api/guide/{id}:
  *   get:
  *     summary: Return single guide
  *     tags: [Guide]
  *     parameters:
  *       - in : path
  *         name: id
  *         description: Id of guide
  *         schema:
  *           type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Get single guide
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/definitions/guideGetResponse'
  *       404:
  *          description: The guide was not found
  *          content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/commonBadRequestResponse'
  *       500:
  *         description: Something went wrong, please try again later.
  */

GuideRoute.get('/:id', getSingleHandler);
/**
 * @swagger
 * components:
 *   schemas:
 *     updateGuide:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         mobile:
 *           type: string
 *           description: mobile
 *         display_name:
 *           type: string
 *           description: display_name
 *         first_name:
 *           type: string
 *           description: first_name
 *         last_name:
 *           type: string
 *           description: last_name
 *         gender:
 *           type: string
 *           description: gender
 *         address:
 *           type: string
 *           description: address
 *       example:
 *         username: string
 *         mobile: string
 *         display_name: string
 *         first_name: string
 *         last_name: string
 *         gender: string
 *         address: array

 * 
 *
 */
/**
 * @swagger
 * definitions:
 *   guideUpdateResponse:
 *     example:
 *       data:
 *         role_id: string
 *         user_details_id: string
 *         username: string
 *         password: string
 *         mobile: string
 *         email: string 
 *         display_name: string
 *         gender: string
 *         date_of_birth: string
 *         first_name: string
 *         last_name: string
 *         address: string
 *         profile_pic: string
 *         is_active: string
 *         is_block: boolean
 *         created_by: string
 *         updated_by: string
 *         deleted_by: string
 *         is_deleted: string
 *         created_at: string
 *         updated_at: string
 *         deleted_at: string
 *       status_code: 200
 *       status_message: User Updated Successfully
 *       response_error: false
 */
/**
  *
  * @swagger
  * /api/guide/{updateId}:
  *   put:
  *     summary: Update guide
  *     tags: [Guide]
  *     parameters:
  *       - in: path
  *         name: updateId
  *         schema:
  *           type: string
  *         required: true
  *         description: guide  id
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/updateGuide'
  *     responses:
  *       200:
  *         description: The guide was successfully updated
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/guideUpdateResponse'
  *       404:
  *         description: Guide can not be found
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/commonBadRequestResponse'
  *       500:
  *         description: Something went wrong, please try again later.
  *
  */

GuideRoute.put('/:updateId', updateHandler);


/**
 * @swagger
 * definitions:
 *   deleteGuideResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Guide Deleted Successfully
 *       response_error: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteGuide:
 *       type: object
 *       required:
 *         - is_deleted
 *       properties:
 *         is_deleted:
 *           type: boolean
 *           description: is_deleted 
 *       example:
 *         is_deleted: true
 *
 */
/**
  *
  * @swagger
  * /api/guide/{deleteId}:
  *   delete:
  *     summary: Delete guide
  *     tags: [Guide]
  *     parameters:
  *       - in: path
  *         name: deleteId
  *         schema:
  *           type: string
  *         required: true
  *         description: guide  id
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/deleteGuide'
  *     responses:
  *       200:
  *         description: The guide was successfully updated
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/deleteGuideResponse'
  *       404:
  *         description: Guide can not be found
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/commonBadRequestResponse'
  *       500:
  *         description: Something went wrong, please try again later.
  *
  */

GuideRoute.delete('/:deleteId', deleteHandler);

export default GuideRoute;
