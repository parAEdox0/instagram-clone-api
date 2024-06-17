// importing user model
import userModel from "../models/user.js";

// function to login user
export const loginUser = async (req, res) => {
    try {
        const response = await userModel.login(req.body);
        res.status(200).json({
            login: "successful",
            user: response
        })
    } catch (error) {
        res.status(400).json({ login: "unsuccessful", error: error.message });
    }
}

//function to register user
export const registerUser = async (req, res) => {
    try {
        const response = await userModel.register(req.body)
        res.status(200).json({ signup: "successful", user: response })
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