const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: function () {
      return this.role == "professor"
        ? "https://www.eskooly.com/bb/uploads/employees/no-image.png"
        : this.role == "student"
        ? "https://eskooly.com/bb/uploads/students/no-image.png"
        : "https://www.eskooly.com/bb/assets/images/unnamed.png";
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
  },
  role: {
    type: String,
    enum: ["admin", "professor", "student"],
  },
  address: {
    type: String,
    required: function () {
      return this.role == "professor" || this.role == "student";
    },
  },
  profRoutine: {
    type: String,
    required: function () {
      return this.role == "professor";
    },
  },
  phoneNumber: {
    type: Number,
    required: function () {
      return this.role == "professor" || this.role == "student";
    },
  },
  elimination: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
      },
      absenceCount: 0,
    },
  ],
  classToTeach: [
    {
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
        required: function () {
          return this.role == "professor";
        },
      },
    },
  ],
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        required: function () {
          return this.role == "professor";
        },
      },
    },
  ],
  listofabscences: [{}],
});

module.exports = mongoose.model("User", userSchema);
