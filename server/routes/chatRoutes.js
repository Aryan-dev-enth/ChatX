import express from "express";
import checkUserAuth from "../middlewares/jwtmiddleware.js";
const router = express.Router();
import ChatController from "../cotrollers/ChatController.js";

router.post("/", checkUserAuth, ChatController.accessChat);
router.get("/", checkUserAuth, ChatController.fetchChats);
router.post("/group", checkUserAuth, ChatController.createGroup);
router.put("/grouprename", checkUserAuth, ChatController.renameGroup);
router.put("/groupremove", checkUserAuth, ChatController.removeFromGroup);
router.put("/groupadd", checkUserAuth, ChatController.addToGroup);

export default router;
