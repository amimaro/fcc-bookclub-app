const Facade = require('../../lib/facade');
const books = require('./schema');

class Books extends Facade {}

module.exports = new Books(books);
