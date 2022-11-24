import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.product';
import { getSingleHandler, getListHandler } from './get.product';
import { createHandler } from './post.product';
import { updateHandler } from './put.product';

const ProductRoute = Router();

ProductRoute.use(authenticateUser);

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
 *   createProductResponse:
 *     example:
 *       data:
 *         slug: string
 *         name: string
 *         tags: array
 *         description: string
 *         category_id: string
 *         inventory_id: string
 *         images: array
 *         price: number
 *         discount_id: string
 *         sku: string
 *         brand: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - slug
 *         - name
 *         - category_id
 *         - inventory_id
 *       properties:
 *         slug:
 *           type: string
 *           description: slug
 *         name:
 *           type: string
 *           description: name
 *         tags:
 *           type: array
 *           description: tags
 *         description:
 *           type: string
 *           description: description
 *         category_id:
 *           type: string
 *           description: category_id
 *         inventory_id:
 *           type: string
 *           description: inventory_id
 *         images:
 *           type: array
 *           description: url and primary 
 *         price:
 *           type: number
 *           description: price
 *         discount_id:
 *           type: string
 *           description: discount_id
 *         sku:
 *           type: array
 *           description: sku
 *         brand:
 *           type: string
 *           description: brand
 * 
 * 
 *       example:
 *         slug: string
 *         name: string
 *         tags: array
 *         description: string
 *         category_id: string
 *         inventory_id: string
 *         images: array 
 *         price: number
 *         discount_id: string
 *         brand: string
 * 
 */

/**
 * @swagger
 *  tags:
 *    name: Product
 *    description: Product Document
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create product for system
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createProductResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 ProductRoute.post('/', createHandler);


/**
 * @swagger
 * /api/product/list:
 *   get:
 *     summary: Returns all Product
 *     tags: [Product]
 *     parameters: 
 *       - in : query
 *         name: limit
 *         description: limit of page Product
 *         schema:
 *           type: integer
 *       - in : query
 *         name: offset
 *         description:  page number  Product
 *         schema:
 *           type: integer
 *       - in : query
 *         name: sort
 *         description: sort
 *         schema:
 *           type: integer
 *       - in : query
 *         name: search
 *         description: search by name and slug
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the Product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/createProductResponse'
 *       404:
 *          description: The Product  not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

 ProductRoute.get('/list', getListHandler);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Gets Product by id
 *     tags: [Product]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: Id of Product
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Product by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createProductResponse'
 *       400:
 *         description: Product can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 ProductRoute.get('/:id', getSingleHandler);


/**
 * @swagger
 * components:
 *   schemas:
 *     updateProduct:
 *       type: object
 *       properties:
 *         slug:
 *           type: string
 *           description: slug
 *         name:
 *           type: string
 *           description: name
 *         tags:
 *           type: array
 *           description: tags
 *         description:
 *           type: string
 *           description: description
 *         category_id:
 *           type: string
 *           description: category_id
 *         inventory_id:
 *           type: string
 *           description: inventory_id
 *         images:
 *           type: array
 *           description: images
 *         price:
 *           type: number
 *           description: price
 *         discount_id:
 *           type: string
 *           description: discount_id
 *         sku:
 *           type: string
 *           description: sku
 *         brand:
 *           type: string
 *           description: brand
 * 
 * 
 *       example:
 *         slug: string
 *         name: string
 *         tags: array
 *         description: string
 *         category_id: string
 *         inventory_id: string
 *         images: string
 *         price: number
 *         discount_id: string
 *         brand: string
 * 
 */
/**
 * @swagger
 * definitions:
 *   updateProductResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Update product successfully
 *       response_error: false
 */

/**
 * @swagger
 * /api/product/{updateId}:
 *   put:
 *     summary: Updates product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: updateId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateProduct'
 *     responses:
 *       200:
 *         description: The product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createProductResponse'
 *       404:
 *         description: Product can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 ProductRoute.put('/:updateId', updateHandler);

/**
 * @swagger
 * definitions:
 *   deleteProductResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Delete  product successfully
 *       response_error: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteProduct:
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
 * /api/product/{deleteId}:
 *   delete:
 *     summary: Delete product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: deleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteProduct'
 *     responses:
 *       200:
 *         description: The Product  Deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ deleteProductResponse'
 *       404:
 *         description: Product can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 ProductRoute.delete('/:deleteId', deleteHandler);




export default ProductRoute;
