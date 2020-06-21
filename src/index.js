const express = require('express');
const router = express.Router();
const routes = require('./js/routes');
const middlewares = require('./js/middlewares');

/**
 * @swagger
 * tags:
 *  - name: Authentification
 *    description: Authentification management
 *  - name: Utils
 *    description: Utils management
 */
router.use('/login', routes.login);
router.use('/register', routes.register);
router.use('/utils', middlewares.checkJWT.check, routes.utils);

module.exports = router;