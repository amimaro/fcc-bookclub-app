const Controller = require('../../lib/controller');
const book = require('./facade');
const rp = require('request-promise');

class Book extends Controller {

  create(req, res, next) {
    if (req.isAuthenticated()) {
      req.body.owner = req.user._id;
      this.facade.create(req.body)
        .then(doc => res.status(201).json(doc))
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

  query(req, res, next) {
    rp('https://www.googleapis.com/books/v1/volumes?q=' + req.params.query)
      .then(function(data) {
        console.log(data);
        res.status(200).json(JSON.parse(data))
      })
      .catch(function(err) {
        res.sendStatus(404);
      });
  }

  findByUser(req, res, next) {
    if (req.isAuthenticated()) {
      return this.facade.find({
          owner: req.user._id
        })
        .then(collection => res.status(200).json(collection))
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

  trade(req, res, next) {
    if (req.isAuthenticated()) {
      req.body.tradeId = req.user._id;
      console.log(req.body)
      this.facade.update({
          _id: req.params.id
        }, req.body)
        .then((results) => {
          if (results.n < 1) {
            return res.sendStatus(404);
          }
          if (results.nModified < 1) {
            return res.sendStatus(304);
          }
          res.sendStatus(204);
        })
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

  confirm(req, res, next) {
    if (req.isAuthenticated()) {
      req.body.owner = req.body.tradeId;
      this.facade.update({
          _id: req.params.id
        }, req.body)
        .then((results) => {
          if (results.n < 1) {
            return res.sendStatus(404);
          }
          if (results.nModified < 1) {
            return res.sendStatus(304);
          }
          res.sendStatus(204);
        })
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

  cancel(req, res, next) {
    if (req.isAuthenticated()) {
      req.body.tradeId = req.body.owner;
      this.facade.update({
          _id: req.params.id
        }, req.body)
        .then((results) => {
          if (results.n < 1) {
            return res.sendStatus(404);
          }
          if (results.nModified < 1) {
            return res.sendStatus(304);
          }
          res.sendStatus(204);
        })
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

}

module.exports = new Book(book);
