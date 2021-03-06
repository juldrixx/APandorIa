const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /utils/verifyToken:
 *  get:
 *    summary: Call to verify the token
 *    tags: [Utils]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 */
router.get('/verifyToken', (req, res) => {
  res.send('Success');
});

module.exports = router;