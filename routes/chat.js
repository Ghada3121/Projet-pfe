const express = require("express");
const router = express.Router();
const Chat = require("../models/chat.js");
const Message = require("../models/message.js");
const User = require("../models/user.js");
const isAuth = require("../middlewares/auth.js");
const user = require("../models/user.js");
const mongoose = require("mongoose");
router.post("/", isAuth, async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.send("No User Exists!");
    }

    let chat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "avatar email fullName  _id",
    });

    if (chat.length > 0) {
      res.send(chat[0]);
    } else {
      const createChat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      });

      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", isAuth, async (req, res) => {
  try {
    const chat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const user = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "avatar email fullName _id",
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/send-message", isAuth, async (req, res) => {
  try {
    const { message, chatId } = req.body;

    if (!message || !chatId) {
      return res
        .status(404)
        .json({ message: "Please Provide All Fields To send Message" });
    }

    let newMessage = {
      sender: req.user._id,
      message: message,
      chat: chatId,
    };

    let m = await Message.create(newMessage);

    const latestMessage = await Message.findById(m._id)
      .populate("sender", "fullName  avatar")
      .populate("chat")
      .populate("users", "-password");
    const updateChat = await Chat.findByIdAndUpdate(
      chatId,
      { latestMessage: latestMessage },
      { new: true }
    );
    res.status(200).json(latestMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      res.status(404).json({ message: "chatId Undefined" });
    }
    // Check if groupId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid chatId" });
    }
    const getMessage = await Message.find({ chat: chatId })
      .populate("sender", "fullName  email avatar _id")
      .populate("chat");

    res.status(200).json(getMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/get/users", async (req, res) => {
  try {
    const getUsers = await user.find({}).select("fullName  email avatar _id");
    res.status(200).json(getUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
