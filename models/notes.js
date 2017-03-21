var mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
  noteTitle: String,
  noteBody: String,
  noteDate: Date,
  roomName: String,
  noteAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "user"}
});

module.exports = mongoose.model('Notes', NotesSchema);

