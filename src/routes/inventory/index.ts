import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.inventory';
import { getSingleHandler, getListHandler } from './get.inventory';
import { createHandler } from './post.inventory';
import { updateHandler } from './put.inventory';

const InventoryRoute = Router();

InventoryRoute.use(authenticateUser);

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
 *   createInventoryResponse:
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
 *     Inventory:
 *       type: object
 *       required:
 *         - title
 *         - quantity
 *         - min
 *       properties:
 *         title:
 *           type: string
 *           description: title
 *         quantity:
 *           type: number
 *           description: quantity
 *         min:
 *           type: number
 *           description: min
 *       example:
 *         title: string
 *         quantity: number
 *         min: number
 * 
 */

/**
 * @swagger
 *  tags:
 *    name: Inventory
 *    description: Inventory Document
 */

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: create inventory for system
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: The inventory successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createInventoryResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 InventoryRoute.post('/', createHandler);


/**
 * @swagger
 * /api/inventory/list:
 *   get:
 *     summary: Returns all inventory
 *     tags: [Inventory]
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
 *         description: The list of the inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/createInventoryResponse'
 *       404:
 *          description: The inventory  not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

 InventoryRoute.get('/list', getListHandler);

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get inventory by id
 *     tags: [Inventory]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of inventory
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Inventory by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createInventoryResponse'
 *       400:
 *         description: Inventory can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 InventoryRoute.get('/:id', getSingleHandler);


/**
 * @swagger
 * components:
 *   schemas:
 *     updateInventory:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: title
 *         quantity:
 *           type: number
 *           description: number
 *         min:
 *           type: number
 *           description: number
 *       example:
 *         title: string
 *         quantity: number
 *         min: number
 * 
 */
/**
 * @swagger
 * definitions:
 *   updateInventoryResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Update inventory successfully
 *       response_error: false
 */

/**
 * @swagger
 * /api/inventory/{updateId}:
 *   put:
 *     summary: Update inventory by id
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: updateId
 *         schema:
 *           type: string
 *         required: true
 *         description: Inventory id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateInventory'
 *     responses:
 *       200:
 *         description: The inventory updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createInventoryResponse'
 *       404:
 *         description: Inventory can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 InventoryRoute.put('/:updateId', updateHandler);

/**
 * @swagger
 * definitions:
 *   deleteInventoryResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Delete inventory successfully
 *       response_error: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteInventory:
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
 * /api/inventory/{deleteId}:
 *   delete:
 *     summary: Delete inventory by id
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: deleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: inventory id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteInventory'
 *     responses:
 *       200:
 *         description:  The inventory delete successfully 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ deleteInventoryResponse'
 *       404:
 *         description: Inventory can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 InventoryRoute.delete('/:deleteId', deleteHandler);



export default  InventoryRoute