import React from "react";
import home from "../assets/home.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="section">
      <div
        className="md:flex flex-row
       items-center justify-between"
      >
        <div>
          <div className="font-bold text-xs text-Teals mb-4">
            Your Attendence Management System
          </div>
          <div className="sm:text-[2.5rem] text-[1.825rem] font-bold">
            This is the <br /> new way to Keep <br /> track your students.
          </div>
          <p className="text-sm leading-7 text-gray max-w-sm">
            This is a Online attendence management system build in MERN stack
            Technology. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="mt-4 flex gap-4">
            <Link
              to="/student/login"
              className="px-6 py-3 text-sm font-bold text-Teals border-2 border-Teals bg-White rounded-lg  "
            >
              Login
            </Link>
          </div>
        </div>
        <div className="flex items-end justify-end mt-8 md:mt-0">
          <img src={home} alt="Laptop-with-a-girl" className="md:w-[60%]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
