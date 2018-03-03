const Controller = require('../../lib/controller');
const book = require('./facade');
const rp = require('request-promise');

class Book extends Controller {

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
    res.sendStatus(200);
  }

}

module.exports = new Book(book);
