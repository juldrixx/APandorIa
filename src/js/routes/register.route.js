const express = require('express');
const { AuthController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register a new User
 *    tags: [Authentification]
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
 *      '500':
 *        description: Internal Server Error
 */
router.post('/', AuthController.register);

module.exports = router;