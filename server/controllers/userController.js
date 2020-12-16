const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Note = require("../models/Note");

exports.register = function (req, res) {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
          },
          process.env.SECRET,
          { expiresIn: "90d" }
        ),
        username: user.data.username,
      });
    })
    .catch((errors) => {
      res.status(400).send(errors);
    });
};

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      res.json({
        token: jwt.sign(
          { _id: user.data._id, username: user.data.username },
          process.env.SECRET,
          { expiresIn: "90d" }
        ),
        username: user.data.username,
      });
    })
    .catch(function (e) {
      res.json(false);
    });
};

exports.isLoggedIn = function (req, res, next) {
  try {
    req.user = jwt.verify(req.body.token, process.env.SECRET);
    next();
  } catch (e) {
    res.status(500).send("Error! Check if the token is valid.");
  }
};

exports.getAllNotesByUsername = async function (req, res) {
  try {
    let creator = await User.findByUsername(req.params.username);
    let notes = await Note.findByAuthorId(creator._id);

    res.json(notes);
  } catch (e) {
    res.status(500).send("Sorry, invalid user requested.");
  }
};
