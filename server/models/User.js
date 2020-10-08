const usersCollection = require("../dbConnection").db().collection("users");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    await usersCollection.insertOne(this.data);
    resolve();
  });
};

module.exports = User;
