const Controller = require('../../lib/controller');
const books = require('./facade');

class Books extends Controller {}

module.exports = new Books(books);
