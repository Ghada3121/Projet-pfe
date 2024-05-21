const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const isAuth = require("../middlewares/auth");
const Absence = require("../models/absence");
const Note = require("../models/Notes");
const User = require("../models/user");
const calendar = require("../models/Calendar");
const profAbsence = require("../models/ProfAbsence");

router.get("/get_class_teach", isAuth, async (req, res) => {
  try {
    const classes = await User.findOne({ _id: req.user._id })
      .populate("classToTeach.group")
      .select("classToTeach");
    res.status(200).json(classes.classToTeach);
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/get_subject_teach", isAuth, async (req, res) => {
  try {
    const subjects = await User.findOne({ _id: req.user._id })
      .populate("subjects.subject")
      .select("subjects");
    res.status(200).json(subjects.subjects);
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/get_class_students/:id", isAuth, async (req, res) => {
  try {
    const classes = await User.find({ groups: req.params.id, role: "student" })
      .populate("groups")
      .select("-password");

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Route to add absences for multiple students
router.post("/add-absences", isAuth, async (req, res) => {
  try {
    const absencesData = req.body.absences; // Assuming absences data is sent as an array in req.body.absences
    // Iterate over absences data
    await absencesData.map(async (absenceData) => {
      // Create a new absence record
      const newAbsence = new Absence({
        student: absenceData.studentId,
        group: absenceData.groupId,
        addedBy: req.user._id, // Assuming you have authentication middleware setting req.user
        subject: absenceData.subjectId,
        situation: "absente", // Default value if situation is not provided
      });

      // Save the absence record
      await newAbsence.save();
    });
    // Update elimination array for each student who has an absence
    for (const element of absencesData) {
      const student = await User.findById(element.studentId);
      if (!student) {
        // Handle case where student is not found
        console.error(`Student with ID ${element.studentId} not found`);
        continue;
      }

      const subjectIndex = student.elimination.findIndex((elimination) =>
        elimination.subject.equals(element.subjectId)
      );
      if (subjectIndex !== -1) {
        // If the subject exists in the elimination array, increment absenceCount
        student.elimination[subjectIndex].absenceCount += 1;
      } else {
        // If the subject does not exist, add it to the elimination array with absenceCount 1
        student.elimination.push({
          subject: element.subjectId,
          absenceCount: 1,
        });
      }
      await student.save();
    }
    res.status(201).json({ message: "Absences added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add absences", details: error.message });
  }
});

// Route to get the absence list added by a specific user
router.get("/absences/history", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const absences = await Absence.find({ addedBy: userId })
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
// Route to get the absence
router.get("/verify-absences/:subjectId/:groupId/:userId", async (req, res) => {
  try {
    const { subjectId, groupId, userId } = req.params;
    const absences = await Absence.find({
      addedBy: userId,
      subject: subjectId,
      group: groupId,
    });

    res.status(200).json({ absences });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch absences", details: error.message });
  }
});
// Route to add exam Date
router.post("/add-exam-date", isAuth, async (req, res) => {
  try {
    const { title, EventTo, start_date, end_date, subject } = req.body;
    const ExamDate = await calendar.create({
      title,
      EventTo,
      typeEvent: "Exam",
      start_date,
      end_date,
      description: subject,
      addedBy: req.user._id,
    });

    res.status(200).json({ ExamDate });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add Exam Date", details: error.message });
  }
});
// Route to get exam Date
router.get("/get-exam-date", isAuth, async (req, res) => {
  try {
    const ExamDate = await calendar
      .find({
        addedBy: req.user._id,
      })
      .populate("EventTo");

    res.status(200).json({ ExamDate });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch Exam Date", details: error.message });
  }
});
// route for add course
router.post("/add-course", isAuth, async (req, res) => {
  try {
    const {
      courseTitle,
      courseFile,
      courseDetails,
      groups,
      subject,
      semestre,
    } = req.body;
    const course = await Course.create({
      courseTitle,
      courseFile,
      courseDetails,
      groups,
      subject,
      semestre,
      addedBy: req.user._id,
    });

    res.status(200).json({ course });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add course", details: error.message });
  }
});
// Route to get course
router.get("/get-course", isAuth, async (req, res) => {
  try {
    const courses = await Course.find({
      addedBy: req.user._id,
    })
      .populate("groups")
      .populate("subject");

    res.status(200).json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch course", details: error.message });
  }
});

// route for add note
router.post("/add-note", isAuth, async (req, res) => {
  try {
    const { student, subject, note } = req.body;
    const findNote = await Note.findOne({ student: student, subject: subject });
    if (findNote) {
      res.status(409).json({ message: "Note Already Adedd !" });
    } else {
      const addNote = await Note.create({
        student,
        subject,
        note,
        addedBy: req.user._id,
      });
      res.status(200).json({ addNote });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add note", details: error.message });
  }
});
// route for add note
router.get("/get-notes", isAuth, async (req, res) => {
  try {
    const notes = await Note.find({
      addedBy: req.user._id,
    })
      .populate("student")
      .populate("subject");

    res.status(200).json({ notes });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fech notes", details: error.message });
  }
});
// route for add absence
router.post("/add-prof-absence", isAuth, async (req, res) => {
  try {
    const { EventTo, start_date, end_date } = req.body;
    const absence = await profAbsence.create({
      addedBy: req.user._id,
      EventTo,
      start_date,
      end_date,
    });

    res.status(200).json(absence);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add absence", details: error.message });
  }
});
module.exports = router;
