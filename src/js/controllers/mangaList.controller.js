const { MangaListModel } = require('../models');

// Create and Save a new MangaList
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  // Create a MangaList
  const mangaList = new MangaListModel({
    userId: req.body.userId,
    mangaId: req.body.mangaId,
    favorite: req.body.favorite,
    current_chapter: req.body.current_chapter,
  });

  // Save MangaList in the database
  MangaListModel.create(mangaList, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the MangaListModel.'
      });
    else res.send(data);
  });
};

// Retrieve all MangaLists from the database.
exports.findAll = (req, res) => {
  let complement = '';
  if (req.query.filteredBy && req.query.filteredWith) {
    complement += `WHERE ${req.query.filteredBy} LIKE '%${req.query.filteredWith}%'`;
  }

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * perPage;

    MangaListModel.getAllPaginate(startIndex, perPage, complement, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving mangaLists.'
        });
      else {
        MangaListModel.count((err, count) => {
          if (err)
            res.status(500).send({
              message:
                err.message || 'Some error occurred while counting mangaLists.'
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
    MangaListModel.getAll(complement, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving mangaLists.'
        });
      else res.send(data);
    });
  }
};

// Find a single MangaList with a mangaListId
exports.findOne = (req, res) => {
  let complement = '';
  if (req.query.filteredBy && req.query.filteredWith) {
    complement += `AND ${req.query.filteredBy} LIKE '%${req.query.filteredWith}%'`;
  }

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * perPage;

    MangaListModel.findByIdPaginate(req.params.userId, req.params.mangaId, startIndex, perPage, complement, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found MangaList with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving MangaList with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        }
      }
      else {
        MangaListModel.countById(req.params.userId, req.params.mangaId, complement, (err, count) => {
          if (err)
            res.status(500).send({
              message:
                err.message || 'Some error occurred while counting mangaLists.'
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
    MangaListModel.findById(req.params.userId, req.params.mangaId, complement, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found MangaList with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving MangaList with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
          });
        }
      } else res.send(data);
    });
  }
};

// Update a MangaList identified by the mangaListId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  MangaListModel.updateById(req.params.userId, req.params.mangaId, new MangaListModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found MangaList with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      } else {
        res.status(500).send({
          message: `Error updating MangaList with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      }
    } else res.send(data);
  }
  );
};

// Delete a MangaList with the specified mangaListId in the request
exports.delete = (req, res) => {
  MangaListModel.remove(req.params.userId, req.params.mangaId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found MangaList with id userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete MangaList with userId ${req.params.userId} and mangaId ${req.params.mangaId}.`
        });
      }
    } else res.send({ message: `MangaList was deleted successfully!` });
  });
};

// Delete all MangaLists from the database.
exports.deleteAll = (req, res) => {
  MangaListModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all mangaLists.'
      });
    else res.send({ message: `All MangaLists were deleted successfully!` });
  });
};