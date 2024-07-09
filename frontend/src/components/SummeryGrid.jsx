import React from "react";
import { Link } from "react-router-dom";

import { PiStudentBold } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";

const SummeryGrid = ({ totalStudent }) => {
  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className=" rounded-full w-12 h-12 flex items-center justify-center bg-sky-500">
          <PiStudentBold className="text-2xl text-Solitude" />
        </div>
        <div className="pl-4">
          <span className="text-lighGray text-sm font-medium">
            Total Students
          </span>
          <div className="text-Teals py-0">
            <strong>{totalStudent}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className=" rounded-full w-12 h-12 flex items-center justify-center bg-green-500">
          <GrUserAdmin className="text-2xl text-Solitude" />
        </div>
        <div className="pl-4">
          <span className="text-lighGray text-sm font-medium">
            Total Admins
          </span>
          <div className="text-Teals py-0">
            <strong>12</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className=" rounded-full w-12 h-12 flex items-center justify-center bg-yellow-500">
          <MdMenuBook className="text-2xl text-Solitude" />
        </div>
        <div className="pl-4">
          <span className="text-lighGray text-sm font-medium">
            Total Courses
          </span>
          <div className="text-Teals py-0">
            <strong>1500+</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className=" rounded-full w-12 h-12 flex items-center justify-center bg-orange-600">
          <IoMdAddCircle className="text-2xl text-Solitude" />
        </div>
        <Link className="pl-4" to="/admin/students/add/new">
          <span className="text-lighGray text-lg font-medium">
            Add New Student
          </span>
        </Link>
      </BoxWrapper>
    </div>
  );
};

const BoxWrapper = ({ children }) => {
  return (
    <div className="bg-white rounded-md p-4 flex-1 border border-lighGray flex items-center">
      {children}
    </div>
  );
};

export default SummeryGrid;
