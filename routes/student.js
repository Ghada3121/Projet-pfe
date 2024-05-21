const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const isAuth = require("../middlewares/auth"); // Middleware pour authentification et vérification du rôle étudiant
const Note = require("../models/Notes");
const Timetable = require("../models/timetable");
const Absence = require("../models/absence");
const Course = require("../models/Course");
const calendar = require("../models/Calendar");
const note = require("../models/Notes");

// Route to get the absence list added by a specific user
router.get("/absences", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const absences = await Absence.find({ student: userId })
      .populate("student", "-password")
      .populate("subject")
      .populate("group");
    res.status(200).json({ absences });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch absences", details: error.message });
  }
});
router.get("/get-exam-date/:groupId", isAuth, async (req, res) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      res.status(404).json({ message: "groupId Undefined" });
    }
    // Check if groupId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const exams = await calendar
      .find({
        typeEvent: "Exam",
        EventTo: { $in: [groupId] },
      })
      .populate("addedBy");
    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/get-exam-scores", isAuth, async (req, res) => {
  const userId = req.user._id;
  try {
    const notes = await note
      .find({
        student: userId,
      })
      .populate("subject")
      .populate("addedBy");
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/get-course/:groupId", isAuth, async (req, res) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      res.status(404).json({ message: "groupId Undefined" });
    }
    // Check if groupId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const courses = await Course.find({
      groups: { $in: [groupId] },
    })
      .populate("subject")
      .populate("addedBy")
      .populate("groups");
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
const Group = require("../models/groups");
const profAbsence = require("../models/ProfAbsence");
const user = require("../models/user");

router.get("/get-group/:groupId", isAuth, async (req, res) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      res.status(404).json({ message: "groupId Undefined" });
    }
    // Check if groupId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const group = await Group.findById(groupId);

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/get-prof-absence", isAuth, async (req, res) => {
  try {
    const findStudent = await user.findById(req.user._id);
    const absence = await profAbsence
      .find({
        EventTo: { $elemMatch: { group: findStudent.groups } },
      })
      .populate("addedBy");
    res.json(absence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
