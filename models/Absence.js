const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
    situation: {
      type: String,
      default: "absente",
    },
  },
  { timestamps: true }
);

const absence = mongoose.model("absence", absenceSchema);
module.exports = absence;
