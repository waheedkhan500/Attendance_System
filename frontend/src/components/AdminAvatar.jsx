import React, { useState } from "react";

import { Link } from "react-router-dom";

import { BASE_URL } from "../utils/constant";

import { useLogoutMutation } from "../slices/studentApiSlice";
import { useDispatch } from "react-redux";
import { removeCrediential } from "../slices/authSlice";

const AdminAvatar = ({ image, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    await logout();
    dispatch(removeCrediential());
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <img
            className="h-10 w-10 rounded-full"
            src={`${BASE_URL}/${image}`}
            alt="User Avatar"
          />
          <span className="ml-2 text-gray font-medium text-lg">{name}</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-Solitude border border-gray ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <Link
              to="/admin/profile"
              className="text-gray block px-4 py-2 text-lg"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Profile
            </Link>
            <Link
              to="/admin/setting"
              className="text-gray block px-4 py-2 text-lg"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Settings
            </Link>
            <button
              className="text-red-500 block px-4 py-2 text-lg"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
              type="button"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAvatar;
