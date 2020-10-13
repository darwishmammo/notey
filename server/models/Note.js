const notesCollection = require("../dbConnection").db().collection("notes");
const User = require("./User");

let Note = function (data, userId) {
  this.data = data;
  this.errors = [];
  this.userId = userId;
};

Post.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.body != "string") {
    this.data.body = "";
  }

  this.data = {
    createdDate: new Date(),
  };
};

Post.prototype.validate = function () {
  if (this.data.title == "") {
    this.errors.push("A note must have a title.");
  }
  if (this.data.body == "") {
    this.errors.push("A note must have a body.");
  }
};

Note.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      notesCollection
        .insertOne(this.data)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((e) => {
          this.errors.push("Error! Try again later.");
          reject(this.errors);
        });
    } else {
      reject(this.errors);
    }
  });
};

module.exports = Note;
