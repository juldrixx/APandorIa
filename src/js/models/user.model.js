const sql = require('./db.js');
const { AuthUtil } = require('../utils/index.js');

// constructor
const UserModel = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = AuthUtil.encryptPassword(user.password);
};

UserModel.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

UserModel.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: 'not_found' }, null);
  });
};

UserModel.getAll = result => {
  sql.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('users: ', res);
    result(null, res);
  });
};

UserModel.updateById = (id, user, result) => {
  sql.query(
    'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
    [user.username, user.email, user.password, id],
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

      console.log('updated user: ', { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

UserModel.remove = (id, result) => {
  sql.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
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

    console.log('deleted user with id: ', id);
    result(null, res);
  });
};

UserModel.removeAll = result => {
  sql.query('DELETE FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

UserModel.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = "${username}"`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the username
    result({ kind: 'not_found' }, null);
  });
};

module.exports = UserModel;