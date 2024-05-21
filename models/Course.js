const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
  ],
  courseFile: {
    type: String,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  courseDetails: {
    type: String,
    required: true,
  },
  semestre: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
