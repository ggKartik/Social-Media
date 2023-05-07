const Message = require("../modals/messageModal");

exports.addMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const data = await Message.create({
      chatId,
      senderId,
      text,
    });
    if (data) {
      res.status(201).json({
        success: true,
        message: "Message Added Successfully",
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Message Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const data = await Message.find({ chatId });
    if (data) {
      res.status(200).json({
        success: true,
        message: "Messages Fetched Successfully",
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Message Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
