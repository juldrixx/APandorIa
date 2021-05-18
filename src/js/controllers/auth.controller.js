const { UserModel, RoleModel } = require('../models');
const { AuthUtil } = require('../utils/index.js');
const jwt = require('jsonwebtoken');
const UserController = require('./user.controller');
const { User } = require('mangadex-full-api');

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = (req, res) => {
  UserModel.findByUsername(req.body.username, (err, dataUser) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User ${req.body.username}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User ' + req.body.username
        });
      }
    } else {
      if (AuthUtil.verifyPassword(req.body.password, dataUser.password)) {
        const token = jwt.sign({ username: req.body.username }, JWT_SECRET, { expiresIn: '24h' });

        RoleModel.findById(dataUser.roleId, (err, dataRole) => {
          if (err) res.status(500).send({ message: 'Error retrieving Role ' + dataUser.roleId });
          else {
            res.json({
              message: 'Authentication successful!',
              user: {
                ...dataUser,
                roleName: dataRole.name,
              },
              token: token
            });
          }
        });
      }
      else {
        res.status(404).send({
          message: `Password incorrect for User ${req.body.username}.`
        });
      }
    };
  });
};

exports.register = (req, res) => {
  UserController.create(req, res);
};