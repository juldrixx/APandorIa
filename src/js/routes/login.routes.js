const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

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
 *      '403':
 *        description: Forbidden
 */
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const mockedUsername = '123';
  const mockedPassword = '456';

  console.log(`${username} is trying to log in with the password: ${password}`);

  if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '24h' });

      res.status(200).json({
        message: 'Authentication successful!',
        user: {username, password},
        token: token
      });
    }
    else {
      res.status(403).send('Incorrect username or password.');
    }
  }
  else {
    res.status(400).send('Authentication failed! Please check the request.');
  }
});

module.exports = router;