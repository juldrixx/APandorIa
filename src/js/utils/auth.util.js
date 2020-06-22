const bcrypt = require('bcrypt');

exports.encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

exports.verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};