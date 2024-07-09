import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import { useSelector } from "react-redux";
import {
  useCheckInMutation,
  useCheckOutMutation,
  useGetUserStatusQuery,
} from "../../slices/studentApiSlice";
import { toast } from "react-toastify";
import CountdownTimer from "../../components/Timer";
import { Navigate } from "react-router-dom";

const StudentHome = () => {
  let userStatus;
  let lastUpdateTime;

  const { userInfo } = useSelector((state) => state.auth);
  // const [userStatus, setUserStatus] = useState(null);
  // const [lastUpdateTime, setLastUpdateTime] = useState("");

  const [present] = useCheckInMutation();
  const [absent] = useCheckOutMutation();

  const { data, refetch, error } = useGetUserStatusQuery(userInfo.id);

  if (error) {
    toast.error(error?.data?.message);
  }

  if (data && data.userStatus) {
    userStatus = data.userStatus;
    lastUpdateTime = data.lastUpdateTime;
  }

  const presentHandler = async () => {
    try {
      const response = await present(userInfo.id);
      if (!response.error) {
        // setUserStatus(response.status);
        toast.success(response?.data?.message);
      }

      toast.error(response?.error?.data?.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  const absentHandler = async () => {
    try {
      const response = await absent(userInfo.id);
      if (!response.error) {
        // setUserStatus(response.status);
        toast.success(response?.data?.message);
      }

      toast.error(response?.error?.data?.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  if (userInfo.role === "admin") {
    return <Navigate to="/admin/" />;
  }
  // useEffect(() => {}, []);
  return (
    <section className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg mt-16 border-2 border-gray">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto mt-8"
              src={`${BASE_URL}/${userInfo.image}`}
              alt={userInfo.name}
            />
            <div className="">
              <h3 className="font-bold text-2xl text-gray-800 text-Teals mb-1">
                {userInfo.name}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                {userInfo.email}
              </div>
              <br />
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <h2 className="font-bold">Status :</h2>
                <span className="text-Teals font-bold">
                  &nbsp; {userStatus ? userStatus : " Plaease wait"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4">
          <CountdownTimer initialTimeString={lastUpdateTime} />
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <button
              className={`flex-1 rounded-full  text-white  font-bold  bg-Teals px-4 py-2 ${
                userStatus == "present" ? "cursor-wait" : "cursor-pointer"
              }`}
              onClick={presentHandler}
              disabled={userStatus == "present" ? true : false}
            >
              Check In
            </button>
            <button
              className={`flex-1 rounded-full border-2 font-bold text-black px-4 py-2 ${
                userStatus == "absent" ? "cursor-wait" : "cursor-pointer"
              }`}
              onClick={absentHandler}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentHome;
