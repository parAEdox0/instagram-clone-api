// importing express
import express from "express";

// importing middlewares
import verifyToken from "../middlewares/verification.middlewares.js"

// importing controllers
import { createPost, getPostsByUser, getPostById, getAllPosts } from "../controllers/postsController.js";

// creating posts router from express
const postsRouter = express.Router();

// protected routes
postsRouter.post("/", verifyToken, createPost);
postsRouter.get("/user", verifyToken, getPostsByUser);
postsRouter.get("/:id", verifyToken, getPostById);

// for development purposes
postsRouter.get("/", getAllPosts);


export default postsRouter;