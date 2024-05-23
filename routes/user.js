const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/auth");
const User = require("../models/user");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const nodemailer = require("nodemailer");
const { matchFace } = require("../recon");

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});
// Multer configuration for file upload
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/", // Specify the folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "gif", "webp"], // Specify the allowed image formats
    public_id: (req, file) => Math.random(), // Generate a unique public ID for each uploaded file
  },
});

const upload = multer({ storage: storage });

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      address,
      phoneNumber,
      groups,
      classToTeach,
    } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      address,
      phoneNumber,
      groups,
      classToTeach,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role, face } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser.role.toLowerCase() !== role.toLowerCase()) {
      return res
        .status(401)
        .json({ message: `this email does not exist for ${role} type` });
    }
    if (findUser) {
      bcrypt.compare(password, findUser.password).then(async function (result) {
        if (result == true) {
          // face recognition
          const faceMatches = await matchFace(findUser.avatar, face);
          console.log(faceMatches);

          if (!faceMatches) {
            return res.status(401).json({ message: "Face not matched" });
          }

          jwt.sign(
            {
              username: findUser.username,
              email: findUser.email,
              role: findUser.role,
              _id: findUser._id,
            },
            process.env.SECRETKEY,
            {
              expiresIn: "7d",
            },
            (err, token) => {
              if (err) {
                console.log(err);
              } else if (token) {
                res
                  .status(200)
                  .json({ message: "Logged Successfully", data: token });
              }
            },
          );
        } else {
          res.status(404).json({ message: "password wrong ! " });
        }
      });
    } else {
      res.status(404).json({ message: "Email not Found ! " });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/current", isAuth, async (req, res) => {
  if (req.user) {
    const findUser = await User.findById(req.user._id)
      .select("-password")
      .populate("subjects.subject")
      .populate("classToTeach.group");
    res.send({ status: true, msg: "authorized", user: findUser });
  } else {
    res.send({ status: false, msg: "unauthorised" });
  }
});

module.exports = router;
