const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const isAuth = require("../middlewares/auth");
const Group = require("../models/groups");
const User = require("../models/user");
const subject = require("../models/Subject");
const nodemailer = require("nodemailer");
const Calendar = require("../models/Calendar");

require("dotenv").config();
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) {
        res.status(500).json({ status: false, message: err });
      } else if (hash) {
        const admin = await User.create({
          fullName: "admin",
          email,
          password: hash,
          role: "admin",
        });
        res.status(201).json({
          status: true,
          message: "Admin Created ",
          data: admin,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});

// Create a group
router.post("/add_group", async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all groups
router.get("/get_group_list", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single group by ID
router.get("/groups/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a group
router.put("/edit_group/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a group
router.delete("/delete_group/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new subject
router.post("/add_subject", async (req, res) => {
  try {
    const { nameOfSubject } = req.body;
    const existingSubject = await subject.findOne({ nameOfSubject });
    if (existingSubject) {
      return res.status(400).json({ error: "Subject already exists" });
    }
    const newSubject = new subject({ nameOfSubject });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all subjects
router.get("/subject_list", async (req, res) => {
  try {
    const subjects = await subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a subject by ID
router.put("/update_subject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nameOfSubject } = req.body;
    const updatedSubject = await subject.findByIdAndUpdate(
      id,
      { nameOfSubject },
      { new: true }
    );
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a subject by ID
router.delete("/delete_subject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await subject.findByIdAndDelete(id);
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get list of students
router.get("/students_list", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).populate("groups");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to generate a random password
function generatePassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

// Add a new student
router.post("/add_student", async (req, res) => {
  try {
    const { fullName, email, address, phoneNumber, groups, avatar } = req.body;
    const password = generatePassword(); // Generate a random password
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      res.status(409).json({ message: "email already exist !" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      avatar,
      fullName,
      email,
      password: hashedPassword,
      role: "student",
      address,
      groups,
      phoneNumber,
    });
    await newUser.save();

    // Send email with the generated password
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // Example for Gmail:
      service: "gmail",
      auth: {
        user: "hardcodebeja@gmail.com",
        pass: "aspwhjbqfjbigvrv",
      },
    });

    const mailOptions = {
      from: "University",
      to: email,
      subject: "Welcome to Our University",
      text: `Dear ${fullName},\n\nYour account has been created successfully. Your password is: ${password}\n\nRegards,\nYour University Admin`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// edit student
router.put("/edit_student/:id", async (req, res) => {
  try {
    const updateStudent = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updateStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// delete student
router.delete("/delete_student/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get list of professor
router.get("/professor_list", async (req, res) => {
  try {
    const professor = await User.find({ role: "professor" })
      .populate("classToTeach.group")
      .populate("subjects.subject");
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add new professor
router.post("/add_professor", async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      phoneNumber,
      subjects,
      classToTeach,
      profRoutine,
      avatar,
    } = req.body;
    const password = generatePassword(); // Generate a random password
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      res.status(409).json({ message: "email already exist !" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      avatar,
      fullName,
      email,
      password: hashedPassword,
      profRoutine,
      role: "professor",
      address,
      classToTeach,
      subjects,
      phoneNumber,
    });
    await newUser.save();

    // Send email with the generated password
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // Example for Gmail:
      service: "gmail",
      auth: {
        user: "hardcodebeja@gmail.com",
        pass: "aspwhjbqfjbigvrv",
      },
    });

    const mailOptions = {
      from: "University",
      to: email,
      subject: "Welcome to Our University",
      text: `Dear ${fullName},\n\nYour account has been created successfully. Your password is: ${password}\n\nRegards,\nYour University Admin`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// edit professor
router.put("/edit_professor/:id", async (req, res) => {
  try {
    const updateProfessor = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updateProfessor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// delete professor
router.delete("/delete_professor/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new calendar event
router.post("/calendar", isAuth, async (req, res) => {
  try {
    const { title, description } = req.body.eventDetails;
    const newEvent = new Calendar({
      title,
      description,
      addedBy: req.user._id,
      typeEvent: "Event",
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all calendar events
router.get("/calendar", async (req, res) => {
  try {
    const events = await Calendar.find({ typeEvent: "Event" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single calendar event by ID
router.get("/calendar/:id", async (req, res) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Calendar event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a calendar event by ID
router.put("/calendar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Calendar.findByIdAndUpdate(
      id,
      { ...req.body.eventDetails },
      {
        new: true,
      }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Calendar event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a calendar event by ID
router.delete("/calendar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Calendar.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Calendar event not found" });
    }
    res.json({ message: "Calendar event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

module.exports = router;
