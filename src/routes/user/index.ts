import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.user';
import { getListHandler, getSingleHandler } from './get.user';
import { createHandler,  createChangePasswordHandler } from './post.user';
import { updateHandler } from './put.user';

const UserRoute = Router();

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
 *     User:
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
 *    name: User
 *    description: User Document
 */


/**
 * @swagger
 * definitions:
 *   userResponse:
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
 *       status_message: User Created successfully
 *       response_error: false
 */

/**
 *
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/userResponse'
 *       404:
 *         description: User can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */

UserRoute.post('/', createHandler); // Register User

UserRoute.use(authenticateUser);
/**
 * @swagger
 * components:
 *   schemas:
 *     UserPassword:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           description: User currentPassword
 *         newPassword:
 *           type: string
 *           description: User newPassword
 *       example:
 *         currentPassword: string
 *         newPassword: string
 */
/**
 * @swagger
 * definitions:
 *   userResponsePassword:
 *     example:
 *       data:
 *         currentPassword: string
 *         newPassword: string
 *         created_by: string
 *         updated_by: string
 *         deleted_by: string
 *         is_deleted: string
 *         created_at: string
 *         updated_at: string
 *         deleted_at: string
 *       status_code: 200
 *       status_message: User password updated successfully
 *       response_error: false
 */

/**
 *
 * @swagger
 * /api/user/change-password:
 *   post:
 *     summary: Change password 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPassword'
 *     responses:
 *       201:
 *         description: The user password successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/userResponsePassword'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */

 UserRoute.post('/change-password',  createChangePasswordHandler ); // Register User
/**
 * @swagger
 * definitions:
 *   userGetResponse:
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
 *       status_message: User List Retrieved Successfully
 *       response_error: false
 */
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Return All user
 *     tags: [User]
 *     parameters: 
 *       - in : query
 *         name: limit
 *         description: limit of page  user
 *         schema:
 *           type: integer
 *       - in : query
 *         name: offset
 *         description:  page number  user
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
 *         description: Get the list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/userGetResponse'
 *       404:
 *          description: The user was not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
UserRoute.get('/', getListHandler);

/**
  * @swagger
  * /api/user/{id}:
  *   get:
  *     summary: Return single user
  *     tags: [User]
  *     parameters:
  *       - in : path
  *         name: id
  *         description: Id of user
  *         schema:
  *           type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Get single user
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/definitions/userGetResponse'
  *       404:
  *          description: The user was not found
  *          content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/commonBadRequestResponse'
  *       500:
  *         description: Something went wrong, please try again later.
  */

UserRoute.get('/:id', getSingleHandler);
/**
 * @swagger
 * components:
 *   schemas:
 *     updateUser:
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
 *   userUpdateResponse:
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
  * /api/user/{updateId}:
  *   put:
  *     summary: Update user
  *     tags: [User]
  *     parameters:
  *       - in: path
  *         name: updateId
  *         schema:
  *           type: string
  *         required: true
  *         description: user  id
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/updateUser'
  *     responses:
  *       200:
  *         description: The user was successfully updated
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/userUpdateResponse'
  *       404:
  *         description: User can not be found
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/commonBadRequestResponse'
  *       500:
  *         description: Something went wrong, please try again later.
  *
  */

UserRoute.put('/:updateId', updateHandler);


/**
 * @swagger
 * definitions:
 *   deleteUserResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: User Deleted Successfully
 *       response_error: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteUser:
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
  * /api/user/{deleteId}:
  *   delete:
  *     summary: Delete user
  *     tags: [User]
  *     parameters:
  *       - in: path
  *         name: deleteId
  *         schema:
  *           type: string
  *         required: true
  *         description: user  id
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/deleteUser'
  *     responses:
  *       200:
  *         description: The user was successfully updated
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/deleteUserResponse'
  *       404:
  *         description: User can not be found
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/definitions/commonBadRequestResponse'
  *       500:
  *         description: Something went wrong, please try again later.
  *
  */

UserRoute.delete('/:deleteId', deleteHandler);



export default UserRoute;
