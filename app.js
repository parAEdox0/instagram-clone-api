// importing express
import express from "express";

// importing other dependencies
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";

// basic configuration
dotenv.config();

// creating express app
const app = express();

// defining variables
const PORT = process.env.PORT || 3000;
const MONGOOSE_URI = process.env.MONGOOSE_URI;

// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing middlewares
app.use("/users", usersRouter);

mongoose.connect(MONGOOSE_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("db successfully connected");
            console.log(`Server is running on port ${PORT}`);
        }).on("error", (err) => { console.log(`ERROR : ${err.message}`); });
    })
    .catch((err) => {
        console.log(err);
    })


