import { Router } from 'express';
import { authenticateUser } from '../../middleware';
import { deleteHandler } from './delete.category';
import { getSingleHandler, getListHandler } from './get.category';
import { createHandler } from './post.category';
import { updateHandler } from './put.category';

const CategoryRoute = Router();

CategoryRoute.use(authenticateUser);

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
 *   createCategoryResponse:
 *     example:
 *       data:
 *         name: string
 *         slug: string
 *         tags: array
 *         parent_id: string
 *         description: string
 *         feature_image: string
 *         sort_order: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         slug:
 *           type: string
 *           description: slug
 *         tags:
 *           type: string
 *           description: tags
 *         description:
 *           type: string
 *           description: description
 *         parent_id:
 *           type: string
 *           description: parent_id
 *         feature_image:
 *           type: string
 *           description: feature_image
 *         sort_order:
 *           type: string
 *           description: sort_order
 *       example:
 *         name: string
 *         slug: string
 *         tags: string
 *         description: string
 *         feature_image: string
 *         sort_order: string
 */

/**
 * @swagger
 *  tags:
 *    name: Category
 *    description: Category Document
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create category for system
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category  successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createCategoryResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 CategoryRoute.post('/', createHandler);


/**
 * @swagger
 * /api/category/list:
 *   get:
 *     summary: Returns all category
 *     tags: [Category]
 *     parameters: 
 *       - in : query
 *         name: limit
 *         description: limit of page  category
 *         schema:
 *           type: integer
 *       - in : query
 *         name: offset
 *         description:  page number  category
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
 *         description: The list of the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/getCategoryResponse'
 *       404:
 *          description: The category  not found
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

 CategoryRoute.get('/list', getListHandler);

/**
 * @swagger
 * definitions:
 *   getCategoryResponse:
 *     example:
 *       data:
 *         public_id: string
 *         name: string
 *         slug: string
 *         tags: array
 *         parent_id: string
 *         description: string
 *         feature_image: string
 *         sort_order: string
 *         visible_on_homepage: boolean
 *         status: boolean
 *         is_deleted: boolean
 *         created_at: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Gets category by id
 *     tags: [Category]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of category
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Category by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/getCategoryResponse'
 *       400:
 *         description: Category can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 CategoryRoute.get('/:id', getSingleHandler);


/**
 * @swagger
 * components:
 *   schemas:
 *     updateCategory:
 *       type: object
*       properties:
 *         name:
 *           type: string
 *           description: name
 *         slug:
 *           type: string
 *           description: slug
 *         tags:
 *           type: string
 *           description: tags
 *         description:
 *           type: string
 *           description: description
 *         parent_id:
 *           type: string
 *           description: parent_id
 *         feature_image:
 *           type: string
 *           description: feature_image
 *         sort_order:
 *           type: string
 *           description: sort_order
 *       example:
 *         public_id: string
 *         name: string
 *         slug: string
 *         tags: string
 *         description: string
 *         feature_image: string
 *         sort_order: string
 */
/**
 * @swagger
 * definitions:
 *   updateCategoryResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Category Updated Successfully
 *       response_error: false
 */

/**
 * @swagger
 * /api/category/{updateId}:
 *   put:
 *     summary: Updates category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: updateId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateCategory'
 *     responses:
 *       200:
 *         description: The category  updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createCategoryResponse'
 *       404:
 *         description: Category can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 CategoryRoute.put('/:updateId', updateHandler);

/**
 * @swagger
 * definitions:
 *   deleteCategoryResponse:
 *     example:
 *       data: {}
 *       status_code: 200
 *       status_message: Category Deleted Successfully
 *       response_error: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteCategory:
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
 * /api/category/{deleteId}:
 *   delete:
 *     summary: Delete category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: deleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteCategory'
 *     responses:
 *       200:
 *         description: The category deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ deleteCategoryResponse'
 *       404:
 *         description: Category can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/commonBadRequestResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 *
 */
 CategoryRoute.delete('/:deleteId', deleteHandler);




export default CategoryRoute;
