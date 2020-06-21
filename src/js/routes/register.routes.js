const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Call to register
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
 *      '201':
 *        description: Created
 *      '400':
 *        description: Bad Request
 */
router.post('/', (req, res) => {
  const { username, password } = req.body;

  console.log(`${username} is trying to register with the password: ${password}`);

  if (username && password) {
    // TODO
    res.status(201).send('In progress...');
  }
  else {
    res.status(400).send('Authentication failed! Please check the request.');
  }
});

module.exports = router;