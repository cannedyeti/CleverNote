var express = require('express');
var Notes = require('../models/notes');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Notes.find(function(err, notes) {
      if (err) return res.status(500).send(err);

      return res.send(notes);
    });
  })
  .post(function(req, res) {
      Notes.create(req.body, function(err, note) {
        if (err) return res.status(500).send(err);

        return res.send(note);
      });
    });

router.route('/:id')
    .get(function(req, res) {
      Notes.findById(req.params.id, function(err, note) {
        if (err) return res.status(500).send(err);

        return res.send(note);
    })
    .put(function(req, res){
      //update note here
    })
    .delete(function(req, res){
      //delete note here
    })
});

module.exports = router;
