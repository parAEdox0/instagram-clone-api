// importing express
import express from "express";

// importing controllers
import { loginUser, registerUser, getUsers } from "../controllers/usersController.js";
// createing express router
const usersRouter = express.Router();

// setting up routes
usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);
usersRouter.get("/", getUsers);

// exporting router
export default usersRouter; 