const { MangaModel } = require('../models');

// Create and Save a new Manga
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  // Create a Manga
  const manga = new MangaModel({
    name: req.body.name,
    url: req.body.url,
    cover: req.body.cover,
    last_chapter: req.body.last_chapter,
    mangadexId: req.body.mangadexId,
  });

  // Save Manga in the database
  MangaModel.create(manga, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the MangaModel.'
      });
    else res.send(data);
  });
};

// Retrieve all Mangas from the database.
exports.findAll = (req, res) => {
  let complement = '';
  if (req.query.filteredBy && req.query.filteredWith) {
    complement += `WHERE ${req.query.filteredBy} LIKE '%${req.query.filteredWith}%'`; 
  }

  if (req.query.perPage && req.query.page) {
    const perPage = parseInt(req.query.perPage);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    MangaModel.getAllPaginate(startIndex, perPage, complement, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving mangas.'
        });
      else {
        MangaModel.count(complement, (err, count) => {
          if (err)
            res.status(500).send({
              message:
                err.message || 'Some error occurred while counting mangas.'
            });
          else {
            const results = {};

            if (endIndex < count) {
              results.next = {
                perPage: perPage,
                page: page + 1
              };
            }

            if (startIndex > 0) {
              results.previous = {
                perPage: perPage,
                page: page - 1
              }
            }

            results.numberOfPage = Math.ceil(count / perPage);
            results.result = data;
            res.send(results);
          }
        });
      }
    });
  }
  else {
    MangaModel.getAll(complement, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving mangas.'
        });
      else res.send(data);
    });
  }
};

// Find a single Manga with a mangaId
exports.findOne = (req, res) => {
  MangaModel.findById(req.params.mangaId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Manga with id ${req.params.mangaId}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Manga with id ' + req.params.mangaId
        });
      }
    } else res.send(data);
  });
};

// Update a Manga identified by the mangaId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  MangaModel.updateById(
    req.params.mangaId,
    new MangaModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Manga with id ${req.params.mangaId}.`
          });
        } else {
          res.status(500).send({
            message: 'Error updating Manga with id ' + req.params.mangaId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Manga with the specified mangaId in the request
exports.delete = (req, res) => {
  MangaModel.remove(req.params.mangaId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Manga with id ${req.params.mangaId}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Manga with id ' + req.params.mangaId
        });
      }
    } else res.send({ message: `Manga was deleted successfully!` });
  });
};

// Delete all Mangas from the database.
exports.deleteAll = (req, res) => {
  MangaModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all mangas.'
      });
    else res.send({ message: `All Mangas were deleted successfully!` });
  });
};