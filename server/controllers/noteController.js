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
        res.json(errors);
      });
  } else {
    res.json("invalid route");
  }
};
