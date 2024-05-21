const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  EventTo: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
      },
    ],
  },
  description: {
    type: String,
  },
  typeEvent: {
    type: String,
    enum: ["Event", "Exam"],
  },
  title: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: function () {
      return this.role == "Exam";
    },
  },
  end_date: {
    type: Date,
    required: function () {
      return this.role == "Exam";
    },
  },
});
const calendar = mongoose.model("Calendar", calendarSchema);
module.exports = calendar;
