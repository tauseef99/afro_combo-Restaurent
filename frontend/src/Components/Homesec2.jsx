import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../Assets/images/section2-img1.webp";
import img2 from "../Assets/images/section2-img2.webp";
import { Link } from "react-router-dom";

function Homesec2() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once or every time you scroll
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className="p-[7%] container mx-auto text-white">
      <div className="md:flex items-center justify-center">
        <div className="content md:w-[50%] pr-8" data-aos="zoom-out-left">
          <div className="flex items-center gap-2">
            <hr className="h-[2px] w-[30px] border-none bg-[#4B8E10]"></hr>
            <p className=" text-lg text-[#B3A64D]">ABOUT US</p>
          </div>
          <h3 className="header-heading text-4xl lg:text-7xl my-6 font-semibold">
          Flavour meets Freshness
          </h3>
          <p className="text-gray-500 text-lg">
          Discover our delicious menu crafted with always fresh, locally sourced ingredients
          </p>
          <Link to="/Contact">
            {" "}
            <button className="px-4 py-2 text-[white] mt-12 bg-[#4B8E10] rounded-md md:hover:px-8 duration-300 ease-in-out">
              CONTACT US
            </button>
          </Link>
        </div>

        <div className="mt-4 md:mt-0 md:w-[50%]" data-aos="zoom-out-right">
          <img src={img1} />
        </div>
      </div>

      <div
        className="md:flex  items-center justify-center mt-4 md:mt-0"
        data-aos="zoom-out-left"
      >
        <div className="md:w-[50%]">
          <img src={img2} />
        </div>

        <div
          className="content md:w-[50%] mt-4 md:mt-0 md:pl-8"
          data-aos="zoom-out-right"
        >
          <div className="flex items-center gap-2">
            <hr className="h-[2px] w-[30px] border-none bg-[#4B8E10]"></hr>
            <p className=" text-lg text-[#B3A64D]">RESTAURANT MENU</p>
          </div>
          <h3 className="header-heading text-4xl lg:text-7xl my-6  font-semibold">
            Always Fresh Ingredients
          </h3>
          <p className="text-gray-500 text-lg">
          prepared daily to bring you bold flavours and wholesome goodness in every bite
          </p>
          <Link to="/Menu">
            {" "}
            <button className="px-4 py-2 text-[white] mt-12 bg-[#4B8E10] rounded-md md:hover:px-8 duration-300 ease-in-out">
              VIEW MENU
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homesec2;
