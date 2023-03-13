const sql = require('./db.js');

// constructor
const MangaFollowModel = function (mangaFollow) {
  this.userId = mangaFollow.userId;
  this.mangaId = mangaFollow.mangaId;
  this.current_chapter = mangaFollow.current_chapter;
};

MangaFollowModel.create = (newMangaFollow, result) => {
  sql.query('INSERT INTO manga_follow SET ?', newMangaFollow, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created mangaFollow: ', { id: res.insertId, ...newMangaFollow });
    result(null, { id: res.insertId, ...newMangaFollow });
  });
};

MangaFollowModel.findById = (userId, mangaId, complement, result) => {
  sql.query({
    sql: `SELECT * FROM manga_follow 
              LEFT JOIN manga ON manga_follow.mangaId = manga.id LEFT JOIN user ON manga_follow.userId = user.id 
              WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId} ${complement}` : ''}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (mangaId) {
      console.log('found mangaFollow: ', res[0]);
      result(null, res[0]);
      return;
    }
    else {
      console.log('found mangaFollows: ', res);
      result(null, res);
      return;
    }
  });
};

MangaFollowModel.findByIdPaginate = (userId, mangaId, startIndex, perPage, complement, result) => {
  sql.query({
    sql: `SELECT * FROM manga_follow 
          LEFT JOIN manga ON manga_follow.mangaId = manga.id LEFT JOIN user ON manga_follow.userId = user.id 
          WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId}` : ''} ${complement} LIMIT ${perPage} OFFSET ${startIndex}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (mangaId) {
      console.log('found mangaFollow: ', res[0]);
      result(null, res[0]);
      return;
    }
    else {
      console.log('found mangaFollows: ', res);
      result(null, res);
      return;
    }
  });
};

MangaFollowModel.getAll = (complement = '', result) => {
  sql.query({
    sql: `SELECT * FROM manga_follow 
              LEFT JOIN manga ON manga_follow.mangaId = manga.id LEFT JOIN user ON manga_follow.userId = user.id 
              ${complement}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('mangaFollows: ', res);
    result(null, res);
  });
};

MangaFollowModel.getAllPaginate = (startIndex, perPage, complement, result) => {
  sql.query({
    sql: `SELECT * FROM manga_follow 
        LEFT JOIN manga ON manga_follow.mangaId = manga.id LEFT JOIN user ON manga_follow.userId = user.id
        ${complement} LIMIT ${perPage} OFFSET ${startIndex}`,
    nestTables: true
  }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('mangaFollows: ', res);
    result(null, res);
  });
};

MangaFollowModel.updateById = (userId, mangaId, mangaFollow, result) => {
  sql.query(
    'UPDATE user SET current_chapter = ? WHERE userId = ? AND mangaId = ?',
    [mangaFollow.current_chapter, userId, mangaId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found MangaFollow with the userId and mangaId
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated mangaFollow: ', { userId: userId, mangaId: mangaId, ...mangaFollow });
      result(null, { userId: userId, mangaId: mangaId, ...mangaFollow });
    }
  );
};

MangaFollowModel.remove = (userId, mangaId, result) => {
  sql.query(`DELETE FROM manga_follow WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId}` : ''}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found MangaFollow with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted mangaFollow with userId: ', userId, ' and mangaId: ', mangaId);
    result(null, res);
  });
};

MangaFollowModel.removeAll = result => {
  sql.query('DELETE FROM manga_follow', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} mangaFollows`);
    result(null, res);
  });
};

MangaFollowModel.count = (complement = '', result) => {
  sql.query(`SELECT COUNT(*) AS count FROM manga_follow ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`${res[0].count} rows in mangaFollows`);
    result(null, res[0].count);
  });
}

MangaFollowModel.countById = (userId, mangaId, complement, result) => {
  sql.query(`SELECT COUNT(*) AS count FROM manga_follow 
  LEFT JOIN manga ON manga_follow.mangaId = manga.id LEFT JOIN user ON manga_follow.userId = user.id
  WHERE userId = ${userId} ${mangaId ? `AND mangaId = ${mangaId}` : ''} ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`${res[0].count} rows in mangaFollows for userId ${userId} and mangaId ${mangaId}`);
    result(null, res[0].count);
  });
}

module.exports = MangaFollowModel;