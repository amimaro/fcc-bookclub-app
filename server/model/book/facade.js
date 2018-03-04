const Facade = require('../../lib/facade');
const book = require('./schema');

class Book extends Facade {

  find(...args) {
    return this.model
      .find(...args)
      .populate('owner', 'twitter.username')
      .exec();
  }

}

module.exports = new Book(book);
