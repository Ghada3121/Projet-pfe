const mongoose = require("mongoose");

const profAbsenceSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  EventTo: [
    {
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
      },
    },
  ],

  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
});
const profAbsence = mongoose.model("ProfAbsence", profAbsenceSchema);
module.exports = profAbsence;
