const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
            avatar: user.avatar,
          },
          process.env.SECRET,
          { expiresIn: "90d" }
        ),
        username: user.data.username,
      });
    })
    .catch((errors) => {
      res.status(500).send(errors);
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
