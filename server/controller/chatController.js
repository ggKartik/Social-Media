const Chat = require("../modals/chatModal");

const User = require("../modals/userModal");

exports.createChat = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const data = await Chat.create({
      members: [
        {
          sender,
          receiver,
        },
      ],
    });

    if (data) {
      res.status(201).json({
        success: true,
        message: "Chat Created Successfully",
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Chat Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userChats = async (req, res) => {
  try {
    const chat = await Chat.find({});
    var newchat = [];
    chat.filter((data) => {
      if (
        data.members[0].sender.userId == req.params.id ||
        data.members[0].receiver.userId == req.params.id
      ) {
        newchat.push(data);
      }
    });
    if (chat) {
      res.status(200).json({
        success: true,
        message: "All Chats",
        newchat,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Chat Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.findChat = async (req, res) => {
  try {
    const data = await Chat.findOne({
      members: {
        $elemMatch: {
          senderId: req.body.senderId,
          receiverId: req.body.receiverId,
        },
      },
    });
    if (data) {
      res.status(200).json({
        success: true,
        message: "Chat Found",
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Chat Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
