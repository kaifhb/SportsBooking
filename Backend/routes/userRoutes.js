import express from "express";
import { loginUser, registerUser, getLoggedInUserDetails } from "../controller/User.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)
.get("/getLoggedInUserDetails",protect,getLoggedInUserDetails)
export default userRouter;
