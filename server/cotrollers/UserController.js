import { errorHandler, successHandler, messageHandler } from "../utils/responseHandler.js";
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from "../config/generateToken.js";

class UserController {
  static register = async (req, res) => {
    const { name, email, password, pfp } = req.body;

    if (!name || !email || !password) {
      return messageHandler(res, "All fields are required.", 400);
    }

    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        return messageHandler(res, "User already exists.", 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        pfp
      });

      if (user) {
        return successHandler(res, {
          user,
          token: generateToken(user._id)
        }, "User created successfully.", 201);
      } else {
        return messageHandler(res, "Failed to create user.", 500);
      }
    } catch (error) {
      return errorHandler(res, error);
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return messageHandler(res, "Email and password are required.", 400);
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return messageHandler(res, "User does not exist.", 404);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return messageHandler(res, "Invalid or wrong credentials.", 401);
      }

      return successHandler(res, { token: generateToken(user._id),
        user: user
       }, "User logged in successfully.", 200);
    } catch (error) {
      return errorHandler(res, error);
    }
  };

  static allUsers = async (req, res) => {
    try {
      const search = req.query.search || '';
      const keyword = search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } }
            ]
          }
        : {};
      
      const users = await User.find({
        ...keyword,
        _id: { $ne: req.user._id }
      });
      
      successHandler(res, users, "Data retrieved!");
    } catch (error) {
      messageHandler(res, "Retrieval Error");
    }
  };
  
  
}

export default UserController;
