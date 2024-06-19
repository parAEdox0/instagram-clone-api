// importing mongoose
import mongoose from "mongoose";

// importing other dependencies
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// creting user schema
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniquie: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    profile: {
        type: String,
        default: "placeholder.webp"
    },
    bio: {
        type: String,
        default: ""
    }

});

// creating a register function for user schema
userSchema.statics.register = async function ({ fullName, username, email, password }) {

    // checking if fields are empty
    if (!fullName || !username || !email || !password) throw Error(`fill all the fields`)

    // checking whether user already exists
    const modelStat = await this.findOne({ email });
    if (modelStat) throw Error(`email already exists`);

    // validating email
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) throw Error(`enter a valid email address`);

    // validating if password is strong enough
    const isStrongPassword = validator.isStrongPassword(password, { minLength: 6 });
    if (!isStrongPassword) throw Error(`enter a strong password`);

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt);

    // creating user 
    const createdUser = await this.create({
        fullName,
        username,
        email,
        password: hashedPass
    })

    // creating Jwt token
    const jwtToken = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);

    // returning user and jwt token
    return { _id: createdUser._id, token: jwtToken };

}

// creating a login function for user schema
userSchema.statics.login = async function ({ email, password }) {

    // checking if fields are empty
    if (!email || !password) throw Error(`fill all the fields`);

    // retreiving user from database
    const user = await this.findOne({ email });
    if (!user) throw Error(`user does not exist`);

    // validating password
    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) throw Error(`wrong password`);

    // creating Jwt token
    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // returning user and jwt token
    return { _id: user._id, token: jwtToken };





}

// creating user model
const userModel = mongoose.model("User", userSchema);

// exporting user model
export default userModel;