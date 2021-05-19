
const sql = require('./db.js');

// constructor
const RoleModel = function (role) {
  this.name = role.name;
};

RoleModel.create = (newRole, result) => {
  sql.query('INSERT INTO roles SET ?', newRole, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created role: ', { id: res.insertId, ...newRole });
    result(null, { id: res.insertId, ...newRole });
  });
};

RoleModel.findById = (roleId, result) => {
  sql.query(`SELECT * FROM roles WHERE id = ${roleId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found role: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Role with the id
    result({ kind: 'not_found' }, null);
  });
};

RoleModel.getAll = (complement = '', result) => {
  sql.query(`SELECT * FROM roles ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('roles: ', res);
    result(null, res);
  });
};

RoleModel.getAllPaginate = (startIndex, perPage, complement = '', result) => {
  sql.query(`SELECT * FROM roles ${complement} LIMIT ${perPage} OFFSET ${startIndex}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('roles: ', res);
    result(null, res);
  });
};

RoleModel.updateById = (id, role, result) => {
  sql.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [role.name, id],
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

      console.log('updated role: ', { id: id, ...role });
      result(null, { id: id, ...role });
    }
  );
};

RoleModel.remove = (id, result) => {
  sql.query('DELETE FROM roles WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Role with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted role with id: ', id);
    result(null, res);
  });
};

RoleModel.removeAll = result => {
  sql.query('DELETE FROM roles', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} roles`);
    result(null, res);
  });
};

RoleModel.count = (complement = '', result) => {
  sql.query(`SELECT COUNT(*) AS count FROM roles ${complement}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    
    console.log(`${res[0].count} rows in roles`);
    result(null, res[0].count);
  });
}

module.exports = RoleModel;