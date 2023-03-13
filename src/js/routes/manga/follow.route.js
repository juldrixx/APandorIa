const express = require('express');
const { MangaFollowController } = require('../../controllers');
const router = express.Router();

/**
 * @swagger
 * /mangas/follow:
 *  post:
 *    summary: Create a new MangaFollow
 *    tags: [MangaFollow]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - mangaId
 *              - current_chapter
 *            properties:
 *              userId:
 *                type: integer
 *              mangaId:
 *                type: integer
 *              current_chapter:
 *                type: integer
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.post('/', MangaFollowController.create);

/**
 * @swagger
 * /mangas/follow:
 *  get:
 *    summary: Retrieve all MangaFollows
 *    tags: [MangaFollow]
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
router.get('/', MangaFollowController.findAll);

/**
 * @swagger
 * /mangas/follow/{userId}/{mangaId}:
 *  get:
 *    summary: Retrieve a single MangaFollow with mangaFollowId
 *    tags: [MangaFollow]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: User's id
 *        type: integer
 *        required: true
 *      - in: path
 *        name: mangaId
 *        description: Manga id
 *        type: integer
 *        required: true
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
 * /mangas/follow/{userId}:
 *  get:
 *    summary: Retrieve a single MangaFollow with mangaFollowId
 *    tags: [MangaFollow]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: User's id
 *        type: integer
 *        required: true
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
router.get('/:userId/:mangaId?', MangaFollowController.findOne);

/**
 * @swagger
 * /mangas/follow/{userId}/{mangaId}:
 *  put:
 *    summary: Update a MangaFollow with mangaFollowId
 *    tags: [MangaFollow]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: User's id
 *        type: integer
 *        required: true
 *      - in: path
 *        name: mangaId
 *        description: Manga id
 *        type: integer
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - mangaFollowId
 *              - mangaId
 *              - current_chapter
 *            properties:
 *              mangaFollowId:
 *                type: integer
 *              mangaId:
 *                type: integer
 *              current_chapter:
 *                type: integer
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.put('/:userId/:mangaId', MangaFollowController.update);

/**
 * @swagger
 * /mangas/follow/{userId}/{mangaId}:
 *  delete:
 *    summary: Delete a MangaFollow with mangaFollowId
 *    tags: [MangaFollow]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: User's id
 *        type: integer
 *        required: true
 *      - in: path
 *        name: mangaId
 *        description: Manga id
 *        type: integer
 *        required: true
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 * /mangas/follow/{userId}:
 *  delete:
 *    summary: Delete a MangaFollow with mangaFollowId
 *    tags: [MangaFollow]
 *    security:
 *      - bearerAuth: []
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
router.delete('/:userId/:mangaId?', MangaFollowController.delete);

/**
 * @swagger
 * /mangas/follow:
 *  delete:
 *    summary: Delete all the MangaFollows
 *    tags: [MangaFollow]
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
router.delete('/', MangaFollowController.deleteAll);

module.exports = router;