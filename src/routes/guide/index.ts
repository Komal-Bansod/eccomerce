import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.guide';
import { getListHandler, getSingleHandler } from './get.guide';
import { createHandler } from './post.guide';
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
 *         - personal_details
 *         - contact_details
 *         - address
 *         - other_certificates
 *       properties:
 *         personal_details:
 *           type: string
 *           description: personal_details
 *         contact_details:
 *           type: string
 *           description: contact_details
 *         address:
 *           type: string
 *           description: address
 *         company_details:
 *           type: string
 *           description: company_details
 *         job_history:
 *           type: string
 *           description: job_history
 *         other_certificates:
 *           type: string
 *           description: other_certificates
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         personal_details: object
 *         contact_details: object
 *         address: object
 *         company_details: object
 *         job_history: object
 *         other_certificates: object
 *         password: string
 * 
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
 *         role_id: string
 *         personal_details: string
 *         contact_details: string
 *         address: string
 *         company_details: string
 *         job_history: string
 *         other_certificates: object
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
 *         description: The guide successfully created
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
 *         role_id: string
 *         personal_details: object
 *         contact_details: object
 *         address: object
 *         company_details: object
 *         job_history: object
 *         other_certificates: object
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
 *          description: The guide  not found
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
  *          description: The guide not found
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
*       properties:
 *         personal_details:
 *           type: string
 *           description: personal_details
 *         contact_details:
 *           type: string
 *           description: contact_details
 *         address:
 *           type: string
 *           description: address
 *         company_details:
 *           type: string
 *           description: company_details
 *         job_history:
 *           type: string
 *           description: job_history
 *         other_certificates:
 *           type: string
 *           description: other_certificates
 *       example:
 *         personal_details: object
 *         contact_details: object
 *         address: object
 *         company_details: object
 *         job_history: object
 *         other_certificates: object
 *         first_name: string
 *         last_name: string
 *         email: string
 *         mobile: string
 *         password: string
 *         role_id: string
 * 
 * 
 */
/**
 * @swagger
 * definitions:
 *   guideUpdateResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Guide Updated Successfully
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
  *     responses:
  *       200:
  *         description: The guide successfully updated
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
