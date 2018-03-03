const Facade = require('../../lib/facade');
const book = require('./schema');

class Book extends Facade {}

module.exports = new Book(book);
