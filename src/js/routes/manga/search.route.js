const express = require('express');
const { MangadexUtil } = require('../../utils');
const router = express.Router();

/**
 * @swagger
 * /mangas/search:
 *  get:
 *    summary: Search a manga
 *    tags: [Manga]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: name
 *        description: Manga name
 *        type: string
 *        required: true
 *      - in: query
 *        name: perPage
 *        schema:
 *          type: integer
 *          default: 10
 *          minimum: 1
 *          maximum: 100
 *        description: The numbers of items per page to return ([ 1 .. 100 ])
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *          minimum: 1
 *        description: The page to return
 *    responses:
 *      '200':
 *        description: Successful Response
 *      '403':
 *        description: Forbidden
 *      '500':
 *        description: Internal Server Error
 */
router.get('/', (req, res) => {
  const call = async () => {
    if (!req.query.name) throw new Error('No name was provided.');

    let perPage = 10;
    let page = 1;

    if (req.query.perPage && req.query.page) {
      perPage = parseInt(req.query.perPage);
      page = parseInt(req.query.page);

      if (perPage < 1 || perPage > 100 || isNaN(perPage)) throw new Error('The number of items per page must be a number between 1 and 100.');
      if (page < 1 || isNaN(page)) throw new Error('The page number must be a positive number.');
    }
    const limit = perPage;
    const offset = (page - 1) * limit;

    const searchResults = await MangadexUtil.searchMangaByName(req.query.name, limit, offset);
    const results = {};
    results.result = await Promise.all(searchResults.data.map(async (searchResult) => {
      const result = {
        id: searchResult.id,
        title: searchResult.attributes.title.en || Object.values(searchResult.attributes.title)[0],
        description: searchResult.attributes.description.en || Object.values(searchResult.attributes.description)[0],
        lastChapter: searchResult.attributes.lastChapter || 'N/A',
        url: MangadexUtil.getMangaUrl(searchResult.id)
      }
      const coverInfo = searchResult.relationships.filter(r => r.type === 'cover_art')[0];

      if (coverInfo) {
        const cover = await MangadexUtil.getCoverById(coverInfo.id);
        result.cover = MangadexUtil.getCoverUrl(result.id, cover.data.attributes.fileName);
      }

      return result;
    }));

    results.page = page;
    results.total = searchResults.total;
    results.numberOfPage = Math.ceil(searchResults.total / perPage);

    return res.status(200).json(results);
  }

  call().catch(error => {
    console.error(error);
    res.status(500).send(error.message);
  })
});

module.exports = router;