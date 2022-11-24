import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.admin';
import { getSingleHandler, getListHandler } from './get.admin';
import { createHandler } from './post.admin';
import { updateHandler } from './put.admin';

const AdminRoute = Router();

 AdminRoute.use(authenticateUser);

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
 *   createAdminResponse:
 *     example:
 *       data:
 *         email: string
 *         password: string
 *         first_name: string
 *         last_name: string
 *         date_of_birth: string
 *         mobile: string
 *         gender: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - first_name
 *         - last_name
 *         - date_of_birth
 *         - mobile
 *         - gender
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *         first_name:
 *           type: string
 *           description: first_name
 *         last_name:
 *           type: string
 *           description: last_name
 *         date_of_birth:
 *           type: string
 *           description: date_of_birth
 *         mobile:
 *           type: string
 *           description: mobile
 *         gender:
 *           type: string
 *           description: gender
 *       example:
 *         email: string
 *         password: string
 *         first_name: string
 *         last_name: string
 *         date_of_birth: string
 *         mobile: string
 *         gender: string
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Admin
 *    description: Admin Document
 */

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create admin for system
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: The admin successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createAdminResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
AdminRoute.post('/', createHandler);


/**
 * @swagger
 * /api/admin/list:
 *   get:
 *     summary: Returns all admin
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of the admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/getAdminResponse'
 *       404:
 *          description: The admin  not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

 AdminRoute.get('/list', getListHandler);

/**
 * @swagger
 * definitions:
 *   getAdminResponse:
 *     example:
 *       data:
 *         public_id: string
 *         email: string
 *         role_id: string
 *         admin_id: string
 *         profile_pic: string
 *         password: string
 *         first_name: string
 *         last_name: string
 *         date_of_birth: string
 *         mobile: string
 *         gender: string
 *         is_active: boolean
 *         is_deleted: boolean
 *         created_at: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: gets admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of admin
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Get admin by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/getAdminResponse'
 *       400:
 *         description: Admin can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
AdminRoute.get('/:id', getSingleHandler);

/**
 * @swagger
 * components:
 *   schemas:
 *     updateAdmin:
 *       type: object
  *       properties:
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *         first_name:
 *           type: string
 *           description: first_name
 *         last_name:
 *           type: string
 *           description: last_name
 *         date_of_birth:
 *           type: string
 *           description: date_of_birth
 *         mobile:
 *           type: string
 *           description: mobile
 *         gender:
 *           type: string
 *           description: gender
 *       example:
 *         first_name: string
 *         last_name: string
 *         date_of_birth: string
 *         mobile: string
 *         gender: string
 * 
 */
/**
/**
 * @swagger
 * definitions:
 *   updateAdminResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Update admin Successfully
 *       response_error: false
 */

/**
 * @swagger
 * /api/admin/{updateId}:
 *   put:
 *     summary: updates admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: updateId
 *         schema:
 *           type: string
 *         required: true
 *         description: admin id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateAdmin'
 *     responses:
 *       200:
 *         description: The admin updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/updateAdminResponse'
 *       404:
 *         description: Admin can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
AdminRoute.put('/:updateId', updateHandler);

/**
 * @swagger
 * definitions:
 *   deleteAdminResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Admin  Deleted Successfully
 *       response_error: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteAdmin:
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
 * @swagger
 * /api/admin/{deleteId}:
 *   delete:
 *     summary: Delete admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: deleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteAdmin'
 *     responses:
 *       200:
 *         description: The admin  deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/deleteAdminResponse'
 *       404:
 *         description: Admin can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
AdminRoute.delete('/:deleteId', deleteHandler);




export default AdminRoute;
