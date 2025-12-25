// Import necessary libraries and components
import { React, useEffect } from "react";
import img1 from "../Assets/images/customers-img1.jpg";
import img2 from "../Assets/images/customers-img2.jpg";
import img3 from "../Assets/images/customers-img3.jpg";
import img4 from "../Assets/images/customers-img4.jpg";
import img5 from "../Assets/images/customers-img5.jpg";
import img6 from "../Assets/images/customers-img6.jpg";
import Workcounter from "./Workcounter";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

// Define the Reviewsinfo component
function Reviewsinfo() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once or every time you scroll
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className=" text-center text-white">
      {/* Section Header */}
      <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2 mt-16" />
      <p className="font-semibold pb-3 text-[#B3A64D]">REVIEWS</p>
      <h3 className="text-3xl px-3 sm:text-5xl header-heading py-4">
        What Our Customers Say
      </h3>

      {/* First Grid Section */}
      <div className="p-[7%] container grid sm:grid-cols-2 gap-4 mx-auto">
        <div>
          <img
            src={img1}
            className="h-[350px] sm:h-[250px] lg:h-[400px] w-[100%] object-cover duration-300 ease-in-out rounded-xl"
            data-aos="fade-right"
            alt="Customer 1"
          />
          <img
            src={img2}
            className="h-[350px] sm:h-[250px] lg:h-[400px] w-[100%] object-cover mt-4 rounded-xl"
            data-aos="fade-left"
            alt="Customer 2"
          />
        </div>

        <div>
          <img
            src={img3}
            className="h-[350px] w-[100%] sm:h-[515px] lg:h-[815px] object-cover rounded-xl"
            data-aos="fade-down"
            alt="Customer 3"
          />
        </div>
      </div>

      {/* Workcounter Component */}
      <Workcounter />

      {/* Second Grid Section */}

      <div className="p-[7%] container grid sm:grid-cols-2 gap-4 container mx-auto">
        <div>
          <img
            src={img4}
            className="h-[350px] w-[100%] sm:h-[515px] lg:h-[815px] object-cover rounded-xl"
            data-aos="fade-down"
            alt="Customer 3"
          />
        </div>

        <div>
          <img
            src={img5}
            className="h-[350px] sm:h-[250px] lg:h-[400px] w-[100%] object-cover rounded-xl"
            data-aos="fade-right"
            alt="Customer 1"
          />
          <img
            src={img6}
            className="h-[350px] sm:h-[250px] lg:h-[400px] w-[100%] object-cover mt-4 rounded-xl"
            data-aos="fade-left"
            alt="Customer 2"
          />
        </div>
      </div>
    </div>
  );
}

// Export the component
export default Reviewsinfo;
