const Controller = require('../../lib/controller');
const book = require('./facade');

class Book extends Controller {

  query(req, res, next) {
    console.log(req.params.query)
    res.status(200).json(req.params.query)
  }

}

module.exports = new Book(book);
