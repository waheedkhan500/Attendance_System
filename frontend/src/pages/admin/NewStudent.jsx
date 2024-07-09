import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/Input";
import { useAddNewStudentMutation } from "../../slices/studentApiSlice";

const NewStudent = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const [addNewStudent, { isLoading }] = useAddNewStudentMutation();

  const submitHadnler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", profileImage);
    formData.append("name", event.target.name.value);
    formData.append("studentId", event.target.studentId.value);
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);

    try {
      const response = await addNewStudent(formData).unwrap();
      toast.success(response.message);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border mb-16 sm:max-w-md xl:p-0  ">
        <div className="p-6 md:space-y-6 sm:p-8">
          <center>
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-Teals">
              Create New Student
            </h1>
          </center>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHadnler}>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Jhone"
              lable="Student Name"
            />
            <Input
              id="studentId"
              type="number"
              name="studentId"
              placeholder="0001"
              lable="Student ID"
            />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="name@mail.com"
              lable="Email"
            />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="student4321"
              lable="Password"
            />
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-md  font-medium  text-black"
              >
                Profile Image
              </label>
              <input
                required
                type="file"
                name="image"
                onChange={handleImageChange}
                placeholder="Profile image"
                className="bg-Solitude border border-gray sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700  placeholder-lighGray "
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-Teals focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Create Student
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewStudent;
