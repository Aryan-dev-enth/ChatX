import {
  successHandler,
  errorHandler,
  messageHandler,
} from "../utils/responseHandler.js";
import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

class MessageController {
  static sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      return messageHandler(res, "Invalid data sent to API.");
    }
    var newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
    };
    try {
      var message = await Message.create(newMessage);

      message = await message.populate("sender", "name pfp");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pfp email",
      });

      await Chat.findByIdAndUpdate(chatId, {
        latestMessage: message,
      });

      return successHandler(res, message, "Message sent succesfully");
    } catch (error) {
      return errorHandler(res, error);
    }
  };
  static allMessages = async (req, res) => {
    try {
      const message = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pfp, email")
        .populate("chat");
      return successHandler(res, message, "Message retreived succesfull");
    } catch (error) {
      errorHandler(res, error);
    }
  };
}

export default MessageController;
