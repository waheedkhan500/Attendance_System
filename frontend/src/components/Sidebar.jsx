import React from "react";
import { FcBullish } from "react-icons/fc";

import { MdGridView } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import { IoMdAddCircle } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";

import { Link, NavLink } from "react-router-dom";

const adminLink = [
  { id: "AD11", lable: "Dashboard", link: "/admin/", icon: <MdGridView /> },
  {
    id: "AD22",
    lable: "All Students",
    link: "/admin/students/all",
    icon: <PiStudentBold />,
  },
  {
    id: "AD33",
    lable: "Add Student",
    link: "/admin/students/add/new",
    icon: <IoMdAddCircle />,
  },
  { id: "AD44", lable: "All Admin", link: "/admin/all", icon: <GrUserAdmin /> },
];

const Sidebar = () => {
  return (
    <aside className="bg-neutral-900 w-60 p-3 px-3 flex flex-col text-white">
      <Link className="flex items-center gap-2 px-1 py-3" to="/">
        <FcBullish />
        <span className="text-xl text-Solitude uppercase tracking-wide font-bold">
          Mark.Me
        </span>
      </Link>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {adminLink.map((item) => (
          <LinkItem key={item.id} {...item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        <button className="flex items-center gap-2 text-red-300 px-3 py-2 hover:bg-neutral-700 hover:no-underline active:no-underline  rounded-sm text-lg">
          <span>
            <RiLogoutBoxFill />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
};

const LinkItem = ({ link, lable, icon }) => {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive }) =>
        `flex items-center gap-2  px-3 py-2 hover:bg-neutral-700 hover:no-underline active:no-underline  rounded-sm text-lg ${
          isActive ? "bg-neutral-600 text-white" : ""
        }`
      }
    >
      <span>{icon}</span>
      {lable}
    </NavLink>
  );
};

export default Sidebar;
