const express = require("express");
const { getMessages, addMessage } = require("../controller/messageController");

const messageRouter = express.Router();

messageRouter.route("/addmessage").post(addMessage);
messageRouter.route("/getmessages/:chatId").get(getMessages);

module.exports = messageRouter;
