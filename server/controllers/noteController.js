const Note = require("../models/Note");

exports.create = function (req, res) {
  if (req.params.username == req.user.username) {
    let note = new Note(req.body, req.user._id);
    note
      .create()
      .then(function (id) {
        res.json(id);
      })
      .catch(function (errors) {
        res.status(400).json(errors);
      });
  } else {
    res.json("invalid route");
  }
};

exports.getSingleNote = async function (req, res) {
  try {
    if (req.params.username == req.user.username) {
      let note = await Note.findSingleNoteById(req.params.id);
      res.json(note);
    } else {
      res.json("invalid route");
    }
  } catch {}
};

exports.editNote = function (req, res) {
  let note = new Note(req.body);
  note
    .update(req.params.id)
    .then((result) => {
      if (result == "success") {
        res.json("Note updated successfully");
      } else {
        res.json(note.errors);
      }
    })
    .catch(() => {
      res.json("Permission denied");
    });
};

exports.deleteNote = function (req, res) {
  Note.delete(req.params.id)
    .then(() => {
      res.json("Success");
    })
    .catch((e) => {
      res.json("You are not allowed to delete this note.");
    });
};
