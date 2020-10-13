const notesCollection = require("../dbConnection").db().collection("notes");
const User = require("./User");

let Note = function (data, userId) {
  this.data = data;
  this.errors = [];
  this.userId = userId;
};

Note.prototype.create = function () {
  return new Promise((resolve, reject) => {
    notesCollection
      .insertOne(this.data)
      .then((inserted) => {
        resolve(inserted);
      })
      .catch((e) => {
        this.errors.push("Error! Try again later.");
        reject(this.errors);
      });
  });
};

module.exports = Note;
