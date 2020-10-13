const notesCollection = require("../db").db().collection("notes");
const User = require("./User");

let Note = function (data, userId) {
  this.data = data;
  this.errors = [];
  this.userId = userId;
};

module.exports = Note;
