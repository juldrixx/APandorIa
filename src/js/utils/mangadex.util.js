const mangadexApi = require('mangadex-full-api');
mangadexApi.agent.domainOverride = process.env.MANGADEX_HOSTNAME;

exports.connect = () => {
  return mangadexApi.agent.login(process.env.MANGADEX_USER, process.env.MANGADEX_PASSWORD, false);
};

exports.searchByName = (mangaName) => {
  return mangadexApi.Manga.search(mangaName);
};

exports.searchById = (mangaId) => {
  return new mangadexApi.Manga().fill(mangaId);
};