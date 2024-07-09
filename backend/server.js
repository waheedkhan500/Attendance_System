import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import connectDatabase from "./config/Database.js";
import studentRouter from "./routes/user.js";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config();

// Connectting to Database.
connectDatabase();

const port = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

//Cookie parser middleware.
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving image staticaly.
app.use(
  "/backend/uploads/images",
  express.static(path.join("backend/uploads", "images"))
);

app.use("/api/v1/student", studentRouter);

// adding middleware to handle the routes not found
app.use(notFound);

// Middle ware for Error This is excute only when the above middle ware yield to error.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Running on port https://localhost:${port}`);
});
