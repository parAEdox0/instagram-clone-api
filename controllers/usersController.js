// importing user model
import userModel from "../models/user.js";

// function to login user
export const loginUser = async (req, res) => {
    try {
        const response = await userModel.login(req.body);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ login: "unsuccessful", error: error.message });
    }
}

//function to register user
export const registerUser = async (req, res) => {
    try {
        const response = await userModel.register(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ signup: "unsuccessful", error: error.message });
    }

}

// function to display all the users 
export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// function to display a user based on id
export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// function to upload profile

export const uploadProfile = async (req, res) => {
    res.json({ filename: req.file.filename });
}

// function to update profile
export const editProfile = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.user._id, {
            ...req.body
        }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}