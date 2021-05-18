const express = require('express');
const router = express.Router();
const { RoleController } = require('../controllers');

/**
 * @swagger
 * /roles:
 *  post:
 *    summary: Create a new Role
 *    tags: [Role]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.post('/', RoleController.create);

/**
 * @swagger
 * /roles:
 *  get:
 *    summary: Retrieve all Roles
 *    tags: [Role]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: perPage
 *        schema:
 *          type: integer
 *        description: The numbers of items per page to return
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: The page to return
 *      - in: query
 *        name: filteredBy
 *        schema:
 *          type: string
 *        description: The field on which the filter is applied
 *      - in: query
 *        name: filteredWith
 *        schema:
 *          type: string
 *        description: The filter applied
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.get('/', RoleController.findAll);

/**
 * @swagger
 * /roles/{roleId}:
 *  get:
 *    summary: Retrieve a single Role with roleId
 *    tags: [Role]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: roleId
 *        description: Role's id
 *        type: integer
 *        required: true
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.get('/:roleId', RoleController.findOne);

/**
 * @swagger
 * /roles/{roleId}:
 *  put:
 *    summary: Update a Role with roleId
 *    tags: [Role]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: roleId
 *        description: Role's id
 *        type: integer
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              rolename:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.put('/:roleId', RoleController.update);

/**
 * @swagger
 * /roles/{roleId}:
 *  delete:
 *    summary: Delete a Role with roleId
 *    tags: [Role]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: roleId
 *        description: Role's id
 *        type: integer
 *        required: true
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.delete('/:roleId', RoleController.delete);

/**
 * @swagger
 * /roles:
 *  delete:
 *    summary: Delete all the Roles
 *    tags: [Role]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.delete('/', RoleController.deleteAll);

module.exports = router;