const notesCollection = require("../dbConnection").db().collection("notes");
const User = require("./User");
const ObjectID = require("mongodb").ObjectID;

let Note = function (data, userId) {
  this.data = data;
  this.errors = [];
  this.userId = userId;
};

Note.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.body != "string") {
    this.data.body = "";
  }

  this.data = {
    title: this.data.title,
    body: this.data.body,
    createdDate: new Date(),
    creator: ObjectID(this.userId),
  };
};

Note.prototype.validate = function () {
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
          resolve(inserted.ops[0]._id);
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

Note.reusablePostQuery = function (operations) {
  return new Promise(async function (resolve, reject) {
    let aggregations = operations.concat([
      {
        $project: {
          title: 1,
          body: 1,
          createdDate: 1,
          creatorId: "$creator",
        },
      },
    ]);

    let notes = await notesCollection.aggregate(aggregations).toArray();

    notes = notes.map(function (note) {
      note.creatorID = undefined;

      return note;
    });

    resolve(notes);
  });
};

Note.findByAuthorId = function (creatorID) {
  return Note.reusablePostQuery([
    { $match: { creator: creatorID } },
    { $sort: { createdDate: -1 } },
  ]);
};

module.exports = Note;
