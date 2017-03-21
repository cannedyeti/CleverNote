var mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
  noteTitle: String,
  noteBody: String,
  noteDate: Date,
  roomName: String,
  noteAuthor: String
});

module.exports = mongoose.model('Notes', NotesSchema);

