import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { errorHandler, messageHandler } from "../utils/responseHandler.js";

const checkUserAuth = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return messageHandler(res, "Authorization header missing");
    }

    try {
        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return messageHandler(res, "Authorization token missing");
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) {
            return messageHandler(res, "Invalid token");
        }

        req.user = await User.findById(id).select('-password');

        if (!req.user) {
            return messageHandler(res, "User not found");
        }

        next();
    } catch (error) {
        errorHandler(res, error);
    }
};

export default checkUserAuth;
