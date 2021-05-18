const sql = require('./db.js');

// constructor
const MangaListModel = function (mangaList) {
  this.userId = mangaList.userId;
  this.mangaId = mangaList.mangaId;
  this.favorite = mangaList.favorite;
  this.current_chapter = mangaList.current_chapter;
};

MangaListModel.create = (newMangaList, result) => {
  sql.query('INSERT INTO mangalists SET ?', newMangaList, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created mangaList: ', { id: res.insertId, ...newMangaList });
    result(null, { id: res.insertId, ...newMangaList });
  });
};

MangaListModel.findById = (userId, mangaId, complement, result) => {
  sql.query({
    sql: `SELECT * FROM mangalists 
              LEFT JOIN mangas ON mangalists.mangaId = mangas.id LEFT JOIN users ON mangalists.userId = users.id 
              WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId} ${complement}` : ''}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (mangaId) {
      console.log('found mangaList: ', res[0]);
      result(null, res[0]);
      return;
    }
    else {
      console.log('found mangaLists: ', res);
      result(null, res);
      return;
    }
  });
};

MangaListModel.findByIdPaginate = (userId, mangaId, startIndex, perPage, complement, result) => {
  sql.query({
    sql: `SELECT * FROM mangalists 
          LEFT JOIN mangas ON mangalists.mangaId = mangas.id LEFT JOIN users ON mangalists.userId = users.id 
          WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId}` : ''} ${complement} LIMIT ${perPage} OFFSET ${startIndex}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (mangaId) {
      console.log('found mangaList: ', res[0]);
      result(null, res[0]);
      return;
    }
    else {
      console.log('found mangaLists: ', res);
      result(null, res);
      return;
    }
  });
};

MangaListModel.getAll = (complement = '', result) => {
  sql.query({
    sql: `SELECT * FROM mangalists 
              LEFT JOIN mangas ON mangalists.mangaId = mangas.id LEFT JOIN users ON mangalists.userId = users.id 
              ${complement}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('mangaLists: ', res);
    result(null, res);
  });
};

MangaListModel.getAllPaginate = (startIndex, perPage, complement, result) => {
  sql.query({
    sql: `SELECT * FROM mangalists 
        LEFT JOIN mangas ON mangalists.mangaId = mangas.id LEFT JOIN users ON mangalists.userId = users.id
        ${complement} LIMIT ${perPage} OFFSET ${startIndex}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('mangaLists: ', res);
    result(null, res);
  });
};

MangaListModel.updateById = (userId, mangaId, mangaList, result) => {
  sql.query(
    'UPDATE users SET favorite = ?, current_chapter = ? WHERE userId = ? AND mangaId = ?',
    [mangaList.favorite, mangaList.current_chapter, userId, mangaId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found MangaList with the userId and mangaId
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated mangaList: ', { userId: userId, mangaId: mangaId, ...mangaList });
      result(null, { userId: userId, mangaId: mangaId, ...mangaList });
    }
  );
};

MangaListModel.remove = (userId, mangaId, result) => {
  sql.query(`DELETE FROM mangalists WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId}` : ''}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found MangaList with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted mangaList with userId: ', userId, ' and mangaId: ', mangaId);
    result(null, res);
  });
};

MangaListModel.removeAll = result => {
  sql.query('DELETE FROM mangalists', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} mangaLists`);
    result(null, res);
  });
};

MangaListModel.count = (complement = '', result) => {
  sql.query(`SELECT COUNT(*) AS count FROM mangalists ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`${res[0].count} rows in mangaLists`);
    result(null, res[0].count);
  });
}

MangaListModel.countById = (userId, mangaId, complement, result) => {
  sql.query(`SELECT COUNT(*) AS count FROM mangalists 
  LEFT JOIN mangas ON mangalists.mangaId = mangas.id LEFT JOIN users ON mangalists.userId = users.id
  WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId}` : ''} ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`${res[0].count} rows in mangaLists for userId ${userId} and mangaId ${mangaId}`);
    result(null, res[0].count);
  });
}

module.exports = MangaListModel;