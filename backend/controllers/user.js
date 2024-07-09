import asyncHandler from "../middleware/async.js";
import User from "../models/user.js";
import HttpError from "../models/http-Error.js";
import fs from "fs";
// import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

// Gettting All User.
// Private to Admin.
// method GET.
export const getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await User.find({}, "-password");

  if (!students) {
    return next(
      new HttpError("No Students found. Please add the students first.", 404)
    );
  }
  res.status(200).json({
    success: true,
    message: "All user Fetched Successfully",
    users: students.map((user) => user.toObject({ getters: true })),
  });
});

// Create new Student.
// Private to Admin.
// method PUT
export const addNewStudent = asyncHandler(async (req, res, next) => {
  const { studentId, name, email, password } = req.body;

  const image = req.file.path;

  const existingStudent = await User.findOne({ email });

  if (existingStudent) {
    return next(
      new HttpError("Eamil already registered.Please pick another one", 422)
    );
  }

  const student = await User.create({
    studentId,
    name,
    email,
    password,
    image,
  });

  if (!student) {
    return next(
      new HttpError(
        "Faild to registered student. Please try again letter.",
        500
      )
    );
  }
  res.status(201).json({
    success: true,
    message: "Student Registered Successfully",
    id: student._id,
  });
});

// Login new Student.
// Private to student.
// method POST
export const authStudent = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const student = await User.findOne({ email });

  if (!student) {
    return next(
      new HttpError(
        "Couldn't found the Student with this email. Please registered first.",
        404
      )
    );
  }

  if (password.toString() !== student.password.toString()) {
    return next(
      new HttpError(
        "Invalid Student credentials. Please provide a valid one.",
        402
      )
    );
  }
  // generateToken(res, student._id);

  const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  // res.clearCookie('jwt')

  // set jwt as Http only cookie

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    // expires: new Date(Date.now() + 10000),
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  });

  res.status(201).json({
    success: true,
    message: "Student login Successfully",
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      time: student.upateAt,
      image: student.image,
    },
  });
});

// Make student present
// Private to student
// method POST
export const checkIn = asyncHandler(async (req, res, next) => {
  const student = await User.findById(req.user._id);
  if (!student) {
    return next(
      new HttpError("Couldn't found the Student with this User Id.", 404)
    );
  }
  // Create a new Date object from the ISO 8601 string
  const date = new Date(student.updateAt);

  // Get the time in milliseconds since the Unix epoch
  const lastUpdateTime = date.getTime() + 2 * 60 * 60 * 1000;
  const currentTime = Date.now();

  if (lastUpdateTime > currentTime) {
    return next(
      new HttpError(
        "You can't change your status with in two Hours. please wait for 2 hour.",
        500
      )
    );
  }
  student.status = "present";
  student.updateAt = Date.now();
  await student.save();

  res
    .status(200)
    .json({ message: "Status updated Succesfully", status: student.status });
});

// Make student absent
// Private to student
// method POST
export const checkOut = asyncHandler(async (req, res, next) => {
  const student = await User.findById(req.user._id);
  if (!student) {
    return next(
      new HttpError(
        "Couldn't found the Student with this id. Please registered first.",
        500
      )
    );
  }
  // Create a new Date object from the ISO 8601 string
  const date = new Date(student.updateAt);

  // Get the time in milliseconds since the Unix epoch
  const lastUpdateTime = date.getTime() + 2 * 60 * 60 * 1000;
  const currentTime = Date.now();

  if (lastUpdateTime > currentTime) {
    res.status(500);
    return next(
      new HttpError(
        "You can't change your status with in two Hours. please wait for 2 hour.",
        500
      )
    );
  }
  student.status = "absent";
  student.updateAt = Date.now();
  await student.save();

  res
    .status(200)
    .json({ message: "Status updated Succesfully", status: student.status });
});

// Make student absent
// Private to student
// method POST
export const getStudentStatus = asyncHandler(async (req, res, next) => {
  const student = await User.findById(req.user._id);
  if (!student) {
    res.status(404);
    throw new Error(
      "Couldn't found the Student with this id. Please registered first."
    );
  }

  res.status(200).json({
    message: "Status updated Succesfully",
    userStatus: student.status,
    lastUpdateTime: student.updateAt,
  });
});

// Update Student
// Private to Admin
// method PATCH
export const getStudentDetail = asyncHandler(async (req, res, next) => {
  const student = await User.findById(req.params.id);

  if (!student) {
    return next(
      new HttpError(
        "Couldn't found the Student with this id. Please registered first.",
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    message: "Student data Fetched Successfully",
    student: student.toObject({ getters: true }),
  });
});
// Update Student
// Private to Admin
// method PATCH
export const updateStudent = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const student = await User.findById(req.params.id);

  if (!student) {
    return next(
      new HttpError(
        "Couldn't found the Student with this id. Please registered first.",
        404
      )
    );
  }

  student.name = name;
  student.email = email;
  student.password = password;

  await student.save();

  res.status(200).json({
    success: true,
    message: "Student Updated Successfully",
    id: student._id,
    name: student.name,
    email: student.email,
  });
});

// Delete Student
// Private to Admin
// method DELETE
export const deleteStudent = asyncHandler(async (req, res, next) => {
  const student = await User.findById(req.params.id);
  if (!student) {
    return next(
      new HttpError(
        "Couldn't found the Student with this id. Please registered first.",
        404
      )
    );
  }
  const imagePath = student.image;
  await User.deleteOne({ _id: student._id });
  fs.unlink(imagePath, (err) => console.log(err));
  res.status(200).json({
    success: true,
    message: "Student Deleted Successfully",
  });
});

export const studentLogout = asyncHandler(async (req, res, next) => {
  // Clearing Cookie...
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logout successfully" });
});
