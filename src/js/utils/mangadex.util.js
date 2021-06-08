const got = require('got');

const MANGADEX_URL = process.env.MANGADEX_URL;
const MANGADEX_API = process.env.MANGADEX_API;
const MANGADEX_UPLOADS = process.env.MANGADEX_UPLOADS;

exports.getMangaUrl = (mangaId) => `${MANGADEX_URL}/title/${mangaId}`;
exports.getChapterUrl = (chapterId) => `${MANGADEX_URL}/chapter/${chapterId}`;
exports.getCoverUrl = (mangaId, coverFileName) => `${MANGADEX_UPLOADS}/covers/${mangaId}/${coverFileName}`;

exports.searchMangaByName = (mangaName, limit, offset) => {
  return got(`${MANGADEX_API}/manga?title=${mangaName}&limit=${limit}&offset=${offset}`)
    .then(response => {
      return Promise.resolve(JSON.parse(response.body));
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

exports.getMangaById = (mangaId) => {
  return got(`${MANGADEX_API}/manga/${mangaId}`)
    .then(response => {
      return Promise.resolve(JSON.parse(response.body));
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

exports.getCoverById = (coverId) => {
  return got(`${MANGADEX_API}/cover/${coverId}`)
    .then(response => {
      return Promise.resolve(JSON.parse(response.body));
    })
    .catch(error => {
      return Promise.reject(error);
    });
};