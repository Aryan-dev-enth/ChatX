import express from "express";
const router= express.Router();
import UserController from "../cotrollers/UserController.js";
import checkUserAuth from "../middlewares/jwtmiddleware.js";


router.post("/register",UserController.register);
router.post("/login", UserController.login);
router.get("/",checkUserAuth, UserController.allUsers);

export default router;