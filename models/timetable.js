const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
  groups: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
  },
  timeLine: {
    monday: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
      type: [
        {
          startTime: { type: String,  }, // Start time of class
          endTime: { type: String,  }, // End time of class
          classroom: { type: String, required: true },
          professorName: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        },
      ],
    },
    tuesday: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
      type: [
        {
          startTime: { type: String,  },
          endTime: { type: String,  },
          classroom: { type: String, required: true },
          professorName: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        },
      ],
    },
    wednesday: {
      type: [
        {
          startTime: { type: String,  },
          endTime: { type: String,  },
          classroom: { type: String, required: true },
          professorName: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        },
      ],
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
    },
    thursday: {
      type: [
        {
          startTime: { type: String,  },
          endTime: { type: String,  },
          classroom: { type: String, required: true },
          professorName: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        },
      ],
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
    },
    friday: {
      type: [
        {
          startTime: { type: String,  },
          endTime: { type: String,  },
          classroom: { type: String, required: true },
          professorName: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        },
      ],
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
    },
    saturday: {
      type: [
        {
          startTime: { type: String,  },
          endTime: { type: String,  },
          classroom: { type: String, required: true },
          professorName: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        },
      ],
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
    },
  },
});
const timeTable = mongoose.model("timeTable", timeTableSchema);
module.exports = timeTable;
