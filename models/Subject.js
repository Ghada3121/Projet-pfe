const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  nameOfSubject: {
    type: String,
    required: true,
    unique: true,
  },
});

const subject = mongoose.model("subjects", subjectSchema);
module.exports = subject;
