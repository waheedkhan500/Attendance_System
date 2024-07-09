import React, { useState } from "react";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminAvatar from "./AdminAvatar";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav className="fixed w-full top-0 left-0 z-20 bg-Solitude">
      <div>
        <div className="container py-4 mx-auto flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <HiMenuAlt1
              onClick={() => setShowMenu(true)}
              className="text-3xl sm:hidden cursor-pointer"
            />
            <Link
              to="/"
              className="text-xl text-Teals uppercase tracking-wide font-bold"
            >
              Mark.Me
            </Link>
          </div>
          <ul
            className="sm:flex
          items-center hidden"
          >
            <li
              className="list-none cursor-pointer
             mr-8 hover:text-Teals transition-all duration-100 ease-linear text-lg font-medium"
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="list-none cursor-pointer
             mr-8 hover:text-Teals transition-all duration-100 ease-linear text-lg font-medium"
            >
              <Link to="/">About</Link>
            </li>
            <li
              className="list-none cursor-pointer
             mr-8 hover:text-Teals transition-all duration-100 ease-linear text-lg font-medium"
            >
              <Link to="/">Contact</Link>
            </li>
            {userInfo && userInfo.role.toLowerCase() === "admin" && (
              <li
                className="list-none cursor-pointer
             mr-8 hover:text-Teals transition-all duration-100 ease-linear text-lg font-medium"
              >
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
          {!userInfo ? (
            <Link
              to="/student/login"
              className="px-4 py-2 font-bold text-Teals border-2 border-Teals bg-white rounded-lg hover:bg-white hover:text-Teals hover:border-2 hover:border-Teals transition-all duration-300
            "
            >
              login
            </Link>
          ) : (
            <AdminAvatar image={userInfo.image} name={userInfo.name} />
          )}
          {showMenu && (
            <div className="fixed h-full w-96 top-0 left-0 z-20 bg-Teals text-white flex items-center justify-center flex-col shadow-lg gap-8 md:hidden">
              <li
                className="list-none cursor-pointer
             mr-8 hover:text-Solitude transition-all duration-100 ease-linear text-lg font-medium"
              >
                <Link to="/home">Home</Link>
              </li>
              <li
                className="list-none cursor-pointer
             mr-8 hover:text-Solitude  transition-all duration-100 ease-linear text-lg font-medium"
              >
                <Link to="/home">About</Link>
              </li>{" "}
              <li
                className="list-none cursor-pointer
             mr-8 hover:text-Solitude  transition-all duration-100 ease-linear text-lg font-medium"
              >
                <Link to="/home">Contact</Link>
              </li>
              <HiX
                className="absolute right-12 top-12 text-3xl cursor-pointer"
                onClick={() => setShowMenu(false)}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
