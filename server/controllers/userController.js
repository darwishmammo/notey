const User = require("../models/User");

exports.register = function (req, res) {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      res.json({
        message: "success",
        username: user.data.username,
      });
    })
    .catch((errors) => {
      res.status(500).send(errors);
    });
};
