const { RoleModel } = require('../models');

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  // Create a Role
  const role = new RoleModel({
    name: req.body.name,
  });

  // Save Role in the database
  RoleModel.create(role, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the RoleModel.'
      });
    else res.send(data);
  });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  let complement = '';
  if (req.query.filteredBy && req.query.filteredWith) {
    complement += `WHERE ${req.query.filteredBy} LIKE '%${req.query.filteredWith}%'`;
  }

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * perPage;

    RoleModel.getAllPaginate(startIndex, perPage, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving roles.'
        });
      else {
        RoleModel.count((err, count) => {
          if (err)
            res.status(500).send({
              message:
                err.message || 'Some error occurred while counting roles.'
            });
          else {
            const results = {};
            results.page = page;
            results.total = count;
            results.numberOfPage = Math.ceil(count / perPage);
            results.result = data;
            res.send(results);
          }
        });
      }
    });
  }
  else {
    RoleModel.getAll(complement, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving roles.'
        });
      else res.send(data);
    });
  }
};

// Find a single Role with a roleId
exports.findOne = (req, res) => {
  RoleModel.findById(req.params.roleId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Role with id ${req.params.roleId}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Role with id ' + req.params.roleId
        });
      }
    } else res.send(data);
  });
};

// Update a Role identified by the roleId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  RoleModel.updateById(
    req.params.roleId,
    new RoleModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Role with id ${req.params.roleId}.`
          });
        } else {
          res.status(500).send({
            message: 'Error updating Role with id ' + req.params.roleId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Role with the specified roleId in the request
exports.delete = (req, res) => {
  RoleModel.remove(req.params.roleId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Role with id ${req.params.roleId}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Role with id ' + req.params.roleId
        });
      }
    } else res.send({ message: `Role was deleted successfully!` });
  });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  RoleModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all roles.'
      });
    else res.send({ message: `All Roles were deleted successfully!` });
  });
};