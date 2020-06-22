const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers');

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Call to login
 *    tags: [Authentification]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '400':
 *        description: Bad Request
 *      '404':
 *        description: Ressource Not Found
 */
router.post('/', AuthController.login);

module.exports = router;