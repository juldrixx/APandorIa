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
 *  - name: User
 *    description: User management
 *  - name: Role
 *    description: Role management
 *  - name: Manga
 *    description: Manga management
 *  - name: MangaList
 *    description: MangaList management
 */
router.use('/login', routes.LoginRoute);
router.use('/register', routes.RegisterRoute);

router.use('/utils', middlewares.CheckJWTMiddleware.check, routes.UtilsRoute);

router.use('/users', middlewares.CheckJWTMiddleware.check, routes.UserRoute);
router.use('/roles', middlewares.CheckJWTMiddleware.check, routes.RoleRoute)
router.use('/mangas', /*middlewares.CheckJWTMiddleware.check,*/ routes.MangaRoute);

module.exports = router;