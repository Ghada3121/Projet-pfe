const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  note: {
    type: Number,
    required: true,
  },
});

const note = mongoose.model("note", noteSchema);
module.exports = note;
