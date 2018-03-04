const Controller = require('../../lib/controller');
const book = require('./facade');
const rp = require('request-promise');

class Book extends Controller {

  create(req, res, next) {
    if (req.isAuthenticated()) {
      req.body.userId = req.user._id
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
          userId: req.user._id
        })
        .then(collection => res.status(200).json(collection))
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

}

module.exports = new Book(book);
