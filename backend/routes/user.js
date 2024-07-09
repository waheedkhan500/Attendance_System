import express from "express";
import {
  addNewStudent,
  authStudent,
  checkIn,
  checkOut,
  deleteStudent,
  getAllStudents,
  getStudentDetail,
  getStudentStatus,
  studentLogout,
  updateStudent,
} from "../controllers/user.js";
import { fileUpload } from "../middleware/fileUpload.js";
import { adminRoutes, protectRoutes } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getAllStudents);
router
  .route("/add/new")
  .put(fileUpload.single("image"), protectRoutes, adminRoutes, addNewStudent);
router.route("/login").post(authStudent);
router.route("/logout").post(studentLogout);

router
  .route("/:id")
  .get(protectRoutes, adminRoutes, getStudentDetail)
  .patch(protectRoutes, adminRoutes, updateStudent)
  .delete(protectRoutes, adminRoutes, deleteStudent);

router.route("/:id/absent").post(protectRoutes, checkOut);
router.route("/:id/present").post(protectRoutes, checkIn);
router.route("/:id/status").post(protectRoutes, getStudentStatus);

export default router;
