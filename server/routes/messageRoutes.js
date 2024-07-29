import express from "express";
import checkUserAuth from "../middlewares/jwtmiddleware.js";
const router = express.Router();
import MessageController from "../cotrollers/MessageController.js";

router.post("/", checkUserAuth, MessageController.sendMessage);
router.get("/:chatId", checkUserAuth, MessageController.allMessages);

export default router;