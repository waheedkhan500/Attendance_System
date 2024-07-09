import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setCrediential } from "../../slices/authSlice";
import { useLoginMutation } from "../../slices/studentApiSlice";
import Input from "../../components/Input";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return;
    }
    try {
      const response = await login({ email, password });

      if (response.error) {
        return toast.error(response?.error?.data?.message);
      }
      dispatch(setCrediential({ ...response.data.student }));
      toast.success("Login Successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  if (!userInfo) {
    return (
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border mt-16 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <center>
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-Teals">
                  Login to your student account
                </h1>
              </center>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  lable="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="student4321"
                  lable="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full text-white bg-Teals focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return <Navigate to="/student/me" />;
};

export default StudentLogin;
