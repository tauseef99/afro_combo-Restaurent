import React from "react";
import { Link } from "react-router-dom";

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-2">
    <hr className="h-[2px] w-[30px] border-none bg-[white]" />
    <p className="text-lg">{title}</p>
  </div>
);

const Button = ({ text, className }) => (
  <button
    className={`px-4 py-2 rounded-sm md:hover:px-8 duration-300 ease-in-out ${className}`}
  >
    {text}
  </button>
);

const WorkingHours = () => (
  <div className="bg-[#FCF8F1]/75 h-auto py-[50px] rounded-md flex mt-10 md:mt-0 justify-center items-center md:w-[400px] text-center text-black">
    <div>
      <p className="font-semibold text-[#4B8E10] my-6">Monday to Friday</p>
      <p className="text-2xl header-heading">
      12    <span className="text-[#4B8E10]">:</span> pm
      </p>
      <p className="text-2xl header-heading">
      9:30   <span className="text-[#4B8E10]">:</span> pm
      </p>

      <p className="font-semibold my-6 text-[#4B8E10]">Saturday</p>
      <p className="text-2xl header-heading">
      12 <span className="text-[#4B8E10]">:</span> pm
      </p>
      <p className="text-2xl header-heading">
        10 <span className="text-[#4B8E10]">:</span> pm
      </p>
      <p className="font-semibold my-6 text-[#4B8E10]">Sunday</p> 
      <p className="text-2xl header-heading">
      closed 
      </p>
     
    </div>
  </div>
);

function Reservation() {
  return (
    <div className="py-4  Reservation flex items-center text-white">
      <div className="md:flex items-center gap-8 justify-between p-[7%] container mx-auto">
        <div className="md:w-[50%]">
          <SectionTitle title="RESERVATION" />
          <h2 className="header-heading text-4xl lg:text-6xl my-8">
            WORKING HOURS
          </h2>
          <p>
            Join us for tasty dishes made from fresh ingredients in a warm and
            inviting space. Our friendly staff is here to make your visit
            memorable. We look forward to serving you!
          </p>
          <div className="mt-10 flex gap-2 text-sm md:text-md">
            <Link to="/Menu">
              <button className="bg-[#4B8E10] rounded-md py-2 hover:px-8 duration-300 ease-in-out px-5">
                VIEW MENU
              </button>
            </Link>
            <Link to="/Contact">
              <button className="bg-transparent border border-white rounded-md py-2 hover:px-8 duration-300 ease-in-out px-5">
                CONTACT US
              </button>
            </Link>
          </div>
        </div>
        <WorkingHours />
      </div>
    </div>
  );
}

export default Reservation;
