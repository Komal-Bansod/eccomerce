import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.role';
import { getListHandler, getSingleHandler } from './get.role';
import { createHandler } from './post.role';
import { updateHandler } from './put.role';

const RoleRoute = Router();

RoleRoute.use(authenticateUser);

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
 *   createRoleResponse:
 *     example:
 *       data:
 *         public_id: string
 *         role_name: string
 *         description: string
 *         permissions: array
 *         created_by: string
 *         is_deleted: boolean
 *         created_at: string
 *       status_code: 200
 *       status_message: Role created successfully.
 *       response_error: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - role_name
 *       properties:
 *         role_name:
 *           type: string
 *           description: Role name
 *         description:
 *           type: string
 *           description: description
 *         permission:
 *           type: string
 *           description: permission
 *       example:
 *         role_name: string
 *         description: string
 *         permission: array
 */

/**
 * @swagger
 *  tags:
 *    name: Role
 *    description: Role Document
 */

/**
 * @swagger
 * definitions:
 *   getRoleListResponse:
 *     example:
 *       data:
 *         public_id: string
 *         role_name: string
 *         description: string
 *         permissions: array
 *         created_by: string
 *         is_deleted: boolean
 *         created_at: string
 *       status_code: 200
 *       status_message: Get role successfully.
 *       response_error: false
 */

/**
 * @swagger
 * /api/role/list:
 *   get:
 *     tags: [Role]
 *     summary: Returns all role
 *     parameters: 
 *       - in : query
 *         name: limit
 *         description: limit of page  role
 *         schema:
 *           type: integer
 *       - in : query
 *         name: offset
 *         description:  page number  role
 *         schema:
 *           type: integer
 *       - in : query
 *         name: sort
 *         description: sort by name
 *         schema:
 *           type: integer
 *       - in : query
 *         name: search
 *         description: search by name 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/getRoleListResponse'
 *       404:
 *          description: The role  not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
RoleRoute.get('/list', getListHandler);

/**
 * @swagger
 * /api/role:
 *   post:
 *     summary: Create role for system
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: The Role successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createRoleResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
RoleRoute.post('/', createHandler);

/**
 * @swagger
 * definitions:
 *   getRoleResponse:
 *     example:
 *       data:
 *         public_id: string
 *         role_name: string
 *         permissions: array
 *         created_by: string
 *         is_deleted: boolean
 *         created_at: string
 *       status_code: 200
 *       status_message: Role found successfully
 *       response_error: false
 */

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     summary: Get role by id
 *     tags: [Role]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of role
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Role by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/getRoleResponse'
 *       400:
 *         description: Role can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
RoleRoute.get('/:id', getSingleHandler);

/**
 * @swagger
 * components:
 *   schemas:
 *     updateRole:
 *       type: object
 *       properties:
 *         role_name:
 *           type: string
 *           description: Role name
 *         description:
 *           type: string
 *           description: description
 *         permission:
 *           type: string
 *           description: permission
 *       example:
 *         role_name: string
 *         description: string
 *         permission: array
 */
/**
 * @swagger
 * definitions:
 *   updateRoleResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * /api/role/{updateId}:
 *   put:
 *     summary: Updates role by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: updateId
 *         schema:
 *           type: string
 *         required: true
 *         description: Role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateRole'
 *     responses:
 *       200:
 *         description: The role was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/updateRoleResponse'
 *       404:
 *         description: Role can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */

RoleRoute.put('/:updateId', updateHandler);

/**
 * @swagger
 * definitions:
 *   deleteRoleResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Role Deleted Successfully
 *       response_error: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteRole:
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
 * /api/role/{deleteId}:
 *   delete:
 *     summary: Delete role by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: deleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteRole'
 *     responses:
 *       200:
 *         description: The role  deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/deleteRoleResponse'
 *       404:
 *         description: Role can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */

RoleRoute.delete('/:deleteId', deleteHandler);

export default RoleRoute;
