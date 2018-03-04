const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const book = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  img: {
    type: String
  },
  bookId: {
    type: String
  },
  tradeId: {
    type: Schema.Types.ObjectId
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});


module.exports = mongoose.model('Book', book);
