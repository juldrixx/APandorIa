const express = require('express');
const router = express.Router();
const routes = require('./manga');
const { MangaController } = require('../controllers');
const { MangadexUtil } = require('../utils');

router.use('/search', routes.MangaSearchRoute);
router.use('/follow', routes.MangaFollowRoute);

/**
 * @swagger
 * /mangas:
 *  post:
 *    summary: Create a new Manga
 *    tags: [Manga]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - url
 *              - cover
 *              - last_chapter
 *              - mangadexId
 *            properties:
 *              name:
 *                type: string
 *              url:
 *                type: string
 *              cover:
 *                type: string
 *              last_chapter:
 *                type: integer
 *              mangadexId:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.post('/', (req, res) => {
  if (!req.body.name && !req.body.url && !req.body.cover && !req.body.last_chapter) {
    MangadexUtil.connect()
      .then(() => {
        MangadexUtil.searchById(req.body.mangadexId)
          .then(manga => {
            req.body = {
              ...req.body,
              name: manga.title,
              url: manga.getFullURL('id'),
              cover: manga.getFullURL('cover'),
              last_chapter: manga.chapters[0].chapter,
            };
            
            MangaController.create(req, res);
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
  else {
    MangaController.create(req, res);
  }
});

/**
 * @swagger
 * /mangas:
 *  get:
 *    summary: Retrieve all Mangas
 *    tags: [Manga]
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
router.get('/', MangaController.findAll);

/**
 * @swagger
 * /mangas/{mangaId}:
 *  get:
 *    summary: Retrieve a single Manga with mangaId
 *    tags: [Manga]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: mangaId
 *        description: Manga's id
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
router.get('/:mangaId', MangaController.findOne);

/**
 * @swagger
 * /mangas/{mangaId}:
 *  put:
 *    summary: Update a Manga with mangaId
 *    tags: [Manga]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: mangaId
 *        description: Manga's id
 *        type: integer
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - url
 *              - cover
 *              - last_chapter
 *              - mangadexId
 *            properties:
 *              name:
 *                type: string
 *              url:
 *                type: string
 *              cover:
 *                type: string
 *              last_chapter:
 *                type: integer
 *              mangadexId:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.put('/:mangaId', MangaController.update);

/**
 * @swagger
 * /mangas/{mangaId}:
 *  delete:
 *    summary: Delete a Manga with mangaId
 *    tags: [Manga]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: mangaId
 *        description: Manga's id
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
router.delete('/:mangaId', MangaController.delete);

/**
 * @swagger
 * /mangas:
 *  delete:
 *    summary: Delete all the Mangas
 *    tags: [Manga]
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
router.delete('/', MangaController.deleteAll);

module.exports = router;