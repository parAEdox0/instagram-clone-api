// importing mongoose
import mongoose from "mongoose";

// importing userModel
import userModel from "./user.js";

// creating post schema
const postSchema = mongoose.Schema({
    caption: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

// creating a newPost function for post schema
postSchema.statics.newPost = async function ({ caption, image, user }) {
    // creating a new post
    try {
        const newPost = await this.create({ caption, image, user: user._id });
        user.posts.push(newPost._id);
        await user.save();
        return newPost;
    } catch (error) {
        throw Error(error.message);
    }

}

// creating post model

const postModel = mongoose.model("Post", postSchema);

// exporting post model

export default postModel;