import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/Input";
import {
  useGetUserDetailQuery,
  useUpdateStudentMutation,
} from "../../slices/studentApiSlice";

const EditStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetUserDetailQuery(id);

  const [updateStudent] = useUpdateStudentMutation();

  useEffect(() => {
    if (data && data.student) {
      const { student } = data;
      setName(student.name);
      setEmail(student.email);
      setStudentId(student.studentId);
      setPassword(student.password);
    }
  }, [data]);

  const submitHadnler = async (e) => {
    e.preventDefault();
    const studentData = { name, studentId, email, password, id };

    try {
      const response = await updateStudent(studentData);
      toast.success(response?.data?.message);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border mb-16 sm:max-w-md xl:p-0  ">
        <div className="p-6 md:space-y-6 sm:p-8">
          <center>
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-Teals">
              Update Student
            </h1>
          </center>
          {isLoading ? (
            <p>Plasese wait....</p>
          ) : error ? (
            <p>{error?.data?.message}</p>
          ) : (
            <form className="space-y-4 md:space-y-6" onSubmit={submitHadnler}>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Jhone"
                lable="Student Name"
                value={name}
                onChange={(e) => {
                  console.log(name);
                  setName(e.target.value);
                }}
              />
              <Input
                id="studentId"
                type="number"
                name="studentId"
                placeholder="0001"
                lable="Student ID"
                value={studentId}
                onChange={(e) => setStudentId}
              />
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@mail.com"
                lable="Email"
                value={email}
                onChange={(e) => setEmail}
              />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="student4321"
                lable="Password"
                value={password}
                onChange={(e) => setPassword}
              />

              <button
                type="submit"
                className="w-full text-white bg-Teals focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                update Student
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditStudent;
