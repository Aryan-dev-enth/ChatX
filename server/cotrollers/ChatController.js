import Chat from "../models/chatModel.js";
import {
  errorHandler,
  messageHandler,
  successHandler,
} from "../utils/responseHandler.js";
import User from "../models/userModel.js";

class ChatController {
  static accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return messageHandler(res, "User ID not provided.");
    }

    try {
      let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pfp email",
      });

      if (isChat.length > 0) {
        return successHandler(res, isChat[0], "Chat retrieved successfully.");
      } else {
        const currentUser = await User.findById(req.user._id).select("name");
        const targetUser = await User.findById(userId).select("name");

        if (!currentUser || !targetUser) {
          return messageHandler(res, "One or both users not found.");
        }

        const chatName = `${targetUser.name}`;

        const chatData = {
          chatName,
          isGroupChat: false,
          users: [req.user._id, userId],
        };

        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );

        return successHandler(res, fullChat, "New chat created successfully.");
      }
    } catch (error) {
      console.error("Error accessing chat:", error);
      return errorHandler(res, error);
    }
  };
  static fetchChats = async (req, res) => {
  
    try {
      const chats = await Chat.find({
        users: { $elemMatch: { $eq: req.user._id } },
      })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pfp email",
          });
          successHandler(res, results, "All chats retreived");
        });
    } catch (error) {
      errorHandler(res, error);
    }
  };
  static createGroup = async (req, res) => {
    
    if (!req.body.users || !req.body.name) {
      messageHandler(res, "All fields required.");
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
      messageHandler(res, "More than 2 users required.");
    }
    users.push(req.user);

    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });

      const fullChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      successHandler(res, fullChat, "Group chat created!");
    } catch (error) {
      errorHandler(res, error);
    }
  };

  static renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return messageHandler(res, "Chat not found");
    }

    return successHandler(res, updatedChat, "Chat name updated");
  };
  static addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

      return successHandler(res, added, "Added succesful");
  };


  static removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

      return successHandler(res, removed, "Removed succeful");
    }
  };

 

export default ChatController;
