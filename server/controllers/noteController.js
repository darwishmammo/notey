const Note = require("../models/Note");

exports.create = function (req, res) {
  let note = new Note(req.body, req.user._id);
  note
    .create()
    .then(function (id) {
      res.json(id);
    })
    .catch(function (errors) {
      res.json(errors);
    });
};
