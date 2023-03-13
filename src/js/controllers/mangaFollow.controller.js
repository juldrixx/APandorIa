const { MangaFollowModel } = require('../models');

// Create and Save a new MangaFollow
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  // Create a MangaFollow
  const mangaFollow = new MangaFollowModel({
    userId: req.body.userId,
    mangaId: req.body.mangaId,
    current_chapter: req.body.current_chapter,
  });

  // Save MangaFollow in the database
  MangaFollowModel.create(mangaFollow, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the MangaFollowModel.'
      });
    else res.send(data);
  });
};

// Retrieve all MangaFollows from the database.
exports.findAll = (req, res) => {
  let complement = '';
  if (req.query.filteredBy && req.query.filteredWith) {
    complement += `WHERE ${req.query.filteredBy} LIKE '%${req.query.filteredWith}%'`;
  }

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * perPage;

    MangaFollowModel.getAllPaginate(startIndex, perPage, complement, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving mangaFollows.'
        });
      else {
        MangaFollowModel.count((err, count) => {
          if (err)
            res.status(500).send({
              message:
                err.message || 'Some error occurred while counting mangaFollows.'
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
    MangaFollowModel.getAll(complement, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving mangaFollows.'
        });
      else res.send(data);
    });
  }
};

// Find a single MangaFollow with a mangaFollowId
exports.findOne = (req, res) => {
  let complement = '';
  if (req.query.filteredBy && req.query.filteredWith) {
    complement += `AND ${req.query.filteredBy} LIKE '%${req.query.filteredWith}%'`;
  }

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * perPage;

    MangaFollowModel.findByIdPaginate(req.params.userId, req.params.mangaId, startIndex, perPage, complement, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found MangaFollow with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving MangaFollow with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        }
      }
      else {
        MangaFollowModel.countById(req.params.userId, req.params.mangaId, complement, (err, count) => {
          if (err)
            res.status(500).send({
              message:
                err.message || 'Some error occurred while counting mangaFollows.'
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
    MangaFollowModel.findById(req.params.userId, req.params.mangaId, complement, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found MangaFollow with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving MangaFollow with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        }
      } else res.send(data);
    });
  }
};

// Update a MangaFollow identified by the mangaFollowId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  MangaFollowModel.updateById(req.params.userId, req.params.mangaId, new MangaFollowModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found MangaFollow with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      } else {
        res.status(500).send({
          message: `Error updating MangaFollow with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      }
    } else res.send(data);
  }
  );
};

// Delete a MangaFollow with the specified mangaFollowId in the request
exports.delete = (req, res) => {
  MangaFollowModel.remove(req.params.userId, req.params.mangaId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found MangaFollow with id userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete MangaFollow with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      }
    } else res.send({ message: `MangaFollow was deleted successfully!` });
  });
};

// Delete all MangaFollows from the database.
exports.deleteAll = (req, res) => {
  MangaFollowModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all mangaFollows.'
      });
    else res.send({ message: `All MangaFollows were deleted successfully!` });
  });
};