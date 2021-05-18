const express = require('express');
const { MangaListController } = require('../../controllers');
const router = express.Router();

/**
 * @swagger
 * /mangas/list:
 *  post:
 *    summary: Create a new MangaList
 *    tags: [MangaList]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - mangaListId
 *              - mangaId
 *              - favorite
 *              - current_chapter
 *            properties:
 *              mangaListId:
 *                type: integer
 *              mangaId:
 *                type: integer
 *              favorite:
 *                type: boolean
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
router.post('/', MangaListController.create);

/**
 * @swagger
 * /mangas/list:
 *  get:
 *    summary: Retrieve all MangaLists
 *    tags: [MangaList]
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
router.get('/', MangaListController.findAll);

/**
 * @swagger
 * /mangas/list/{userId}/{mangaId}:
 *  get:
 *    summary: Retrieve a single MangaList with mangaListId
 *    tags: [MangaList]
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
 * /mangas/list/{userId}:
 *  get:
 *    summary: Retrieve a single MangaList with mangaListId
 *    tags: [MangaList]
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
router.get('/:userId/:mangaId?', MangaListController.findOne);

/**
 * @swagger
 * /mangas/list/{userId}/{mangaId}:
 *  put:
 *    summary: Update a MangaList with mangaListId
 *    tags: [MangaList]
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
 *              - mangaListId
 *              - mangaId
 *              - favorite
 *              - current_chapter
 *            properties:
 *              mangaListId:
 *                type: integer
 *              mangaId:
 *                type: integer
 *              favorite:
 *                type: boolean
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
router.put('/:userId/:mangaId', MangaListController.update);

/**
 * @swagger
 * /mangas/list/{userId}/{mangaId}:
 *  delete:
 *    summary: Delete a MangaList with mangaListId
 *    tags: [MangaList]
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
 * /mangas/list/{userId}:
 *  delete:
 *    summary: Delete a MangaList with mangaListId
 *    tags: [MangaList]
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
router.delete('/:userId/:mangaId?', MangaListController.delete);

/**
 * @swagger
 * /mangas/list:
 *  delete:
 *    summary: Delete all the MangaLists
 *    tags: [MangaList]
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
router.delete('/', MangaListController.deleteAll);

module.exports = router;