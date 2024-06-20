// importing models
import postModel from "../models/post.js";
import userModel from "../models/user.js";

// function to create a post
export const createPost = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    const { caption, image } = req.body;
    try {
        const post = await postModel.newPost({ caption, image, user })
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// function to get posts of a specific user
export const getPostsByUser = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });
    try {
        const posts = await postModel.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// function to get post by id
export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postModel.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// function to get all posts (for development purposes)
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}