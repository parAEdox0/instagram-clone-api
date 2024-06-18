import mongoose from "mongoose";
import userModel from "../models/user.js";

// MongoDB connection URI
const mongoURI = "mongodb+srv://instagram-mern-app:instagramMernApp@instagram-mern-app.ixbojiq.mongodb.net/?retryWrites=true&w=majority&appName=instagram-mern-app";

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        clearDb();
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

const clearDb = () => {
    userModel.deleteMany({})
        .then(() => {
            console.log("DB cleared successfully");
            mongoose.connection.close(); // Close the connection after the operation
        })
        .catch((error) => {
            console.error("Error clearing DB:", error.message);
            mongoose.connection.close(); // Close the connection on error
        });
};
