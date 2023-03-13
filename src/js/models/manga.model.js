const sql = require('./db.js');

// constructor
const MangaModel = function (manga) {
  this.name = manga.name;
  this.url = manga.url;
  this.cover = manga.cover;
  this.last_chapter = manga.last_chapter;
  this.mangadexId = manga.mangadexId;
};

MangaModel.create = (newManga, result) => {
  sql.query('INSERT INTO manga SET ?', newManga, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created manga: ', { id: res.insertId, ...newManga });
    result(null, { id: res.insertId, ...newManga });
  });
};

MangaModel.findById = (mangaId, result) => {
  sql.query(`SELECT * FROM manga WHERE id = ${mangaId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found manga: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Manga with the id
    result({ kind: 'not_found' }, null);
  });
};

MangaModel.getAll = (complement, result) => {
  sql.query(`SELECT * FROM manga ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('mangas: ', res);
    result(null, res);
  });
};

MangaModel.getAllPaginate = (startIndex, perPage, complement, result) => {
  sql.query(`SELECT * FROM manga ${complement} LIMIT ${perPage} OFFSET ${startIndex}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('mangas: ', res);
    result(null, res);
  });
};

MangaModel.updateById = (id, manga, result) => {
  sql.query(
    'UPDATE users SET name = ?, url = ?, cover = ?, last_chapter = ?, mangadexId = ? WHERE id = ?',
    [manga.name, manga.url, manga.cover, manga.last_chapter, manga.mangadexId, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated manga: ', { id: id, ...manga });
      result(null, { id: id, ...manga });
    }
  );
};

MangaModel.remove = (id, result) => {
  sql.query('DELETE FROM manga WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Manga with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted manga with id: ', id);
    result(null, res);
  });
};

MangaModel.removeAll = result => {
  sql.query('DELETE FROM manga', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} mangas`);
    result(null, res);
  });
};

MangaModel.count = (complement, result) => {
  sql.query(`SELECT COUNT(*) AS count FROM manga ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    
    console.log(`${res[0].count} rows in manga`);
    result(null, res[0].count);
  });
}

module.exports = MangaModel;