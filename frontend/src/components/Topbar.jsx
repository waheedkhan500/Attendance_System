import React, { Fragment } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import AdminAvatar from "./AdminAvatar";
import { useSelector } from "react-redux";

const Topbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="bg-white flex h-16 px-6 justify-between items-center w-full border border-lighGray">
      <div className="relative">
        <HiOutlineSearch
          fontSize={18}
          className="text-lighGray absolute top-1/2 left-2 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-8 w-[20rem] border border-lighGray rounded-md pl-8 px-6"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <AdminAvatar image={userInfo.image} name={userInfo.name} />
      </div>
    </div>
  );
};

export default Topbar;
