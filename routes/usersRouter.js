// importing express
import express from "express";

// importing middleware
import upload from "../middlewares/multer.middlewares.js";
import verifyToken from "../middlewares/verification.middlewares.js";

// importing controllers
import { loginUser, registerUser, getUsers, getUser, uploadProfile, editProfile } from "../controllers/usersController.js";

// createing express router
const usersRouter = express.Router();

// setting up routes
usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);

// protected routes
usersRouter.post("/upload", verifyToken, upload.single("profile_image"), uploadProfile)
usersRouter.get("/:id", verifyToken, getUser);
usersRouter.patch("/editProfile", verifyToken, editProfile)

// for devlopment only
usersRouter.get("/", getUsers);


// exporting router
export default usersRouter; 