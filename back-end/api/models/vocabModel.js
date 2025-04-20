const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema({
  english: {
    type: String,
    required: 'Enter the English word'
  },
  german: {
    type: String,
    required: 'Enter the German translation'
  }
});

module.exports = mongoose.model('Vocab', VocabSchema, 'vocab');