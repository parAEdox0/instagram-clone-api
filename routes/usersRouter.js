// importing express
import express from "express";

// importing controllers
import { loginUser, registerUser, getUsers, getUser, uploadProfile, editProfile } from "../controllers/usersController.js";

// createing express router
const usersRouter = express.Router();

// importing middleware
import upload from "../middlewares/multer.middlewares.js";
import verifyToken from "../middlewares/verification.middlewares.js";

// setting up routes
usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/upload", upload.single("profile_image"), uploadProfile)
usersRouter.post("/editProfile", verifyToken, editProfile)


// exporting router
export default usersRouter; 