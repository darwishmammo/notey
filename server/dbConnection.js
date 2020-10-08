const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");

mongodb.connect(
  process.env.connectionstring,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    if (error) {
      console.log(error);
    }
    module.exports = client;
    const app = require("./index");
    app.listen(process.env.PORT);
  }
);
