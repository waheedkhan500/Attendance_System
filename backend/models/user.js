import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, required: true, default: "Absent" },
    role: { type: String, required: true, default: "Student" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    updateAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
