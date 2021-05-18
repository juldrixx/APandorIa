const express = require('express');
const { MangadexUtil } = require('../../utils');
const router = express.Router();

/**
 * @swagger
 * /mangas/search/{mangaName}:
 *  get:
 *    summary: Search a manga
 *    tags: [Manga]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: mangaName
 *        description: Manga name
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.get('/:mangaName', (req, res) => {
  MangadexUtil.connect()
    .then(() => {
      MangadexUtil.searchByName(req.params.mangaName)
        .then(mangaIds => {
          const promise = (mangaId) => new Promise((resolve, reject) => {
            MangadexUtil.searchById(mangaId)
              .then(manga => resolve(manga))
              .catch(err => reject(err));
          });

          Promise.all(mangaIds.slice(0, 5).map(promise))
            .then(mangas => {
              res.json(mangas.map(manga => ({ id: manga.id, title: manga.title, cover: manga.getFullURL('cover'), url: manga.getFullURL('id') })));
            })
            .catch(err => {
              res.status(500).send({ message: err });
            });
        })
        .catch(err => {
          res.status(500).send({ message: err });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
});

module.exports = router;