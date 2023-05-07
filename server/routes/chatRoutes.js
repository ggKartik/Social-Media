const express = require("express");
const {
  createChat,
  userChats,
  findChat,
} = require("../controller/chatController");

const chatRouter = express.Router();

chatRouter.route("/createchat").post(createChat);
chatRouter.route("/userchat/:id").get(userChats);
chatRouter.route("/findchat").get(findChat);

module.exports = chatRouter;
