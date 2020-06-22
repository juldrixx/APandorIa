const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a new User
 *    tags: [User]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retrieve all Users
 *    tags: [User]
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.get('/', UserController.findAll);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    summary: Retrieve a single User with userId
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: User's id
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
router.get('/:userId', UserController.findOne);

/**
 * @swagger
 * /users/{userId}:
 *  put:
 *    summary: Update a User with userId
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: User's id
 *        type: integer
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.put('/:userId', UserController.update);

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    summary: Delete a User with userId
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: User's id
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
router.delete('/:userId', UserController.delete);

/**
 * @swagger
 * /users:
 *  delete:
 *    summary: Delete all the Users
 *    tags: [User]
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.delete('/', UserController.deleteAll);

module.exports = router;