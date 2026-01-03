import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Aboutafroimg from "../Assets/images/header-02.png";
import { Link } from "react-router-dom"; // Import useLocation

function Aboutafro() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once or every time you scroll
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className="bg-[black] py-4">
      <div className="p-[7%] container text-center mx-auto text-white">
        <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2" />
        <p className="font-semibold pb-3 text-[#B3A64D]">WHO WE ARE</p>
        <h3 className="text-3xl sm:text-5xl header-heading py-4">
          We Invite You to Visit <br></br>Our Restaurant
        </h3>
        <p className="sm:w-[70%] mt-4 mx-auto">
          Step into our restaurant and indulge in an exceptional dining
          experience. From mouthwatering dishes to a welcoming atmosphere, we
          invite you to enjoy a meal that will leave a lasting impression. Come
          savor the flavors and let us take care of the rest!
        </p>
      </div>

      <div className="px-[7%] container items-center lg:grid grid-cols-2 gap-3 justify-center mx-auto bg-[black]">
        <div className="p-4 text-white  mb-4 lg:mb-0 lg:left-10 w-[100%] rounded-md Aboutafro-content h-[max-content] z-50">
          <h4
            className="header-heading text-3xl font-semibold"
            data-aos="zoom-out-right"
          >
            About{" "}
            <span className="border-b-2 border-[#4B8E10] ml-2">
              {" "}
              <span className="text-[#4B8E10] font-bold">Digi</span>
              <span className=" font-bold text-[#B3A54F]">bite</span>
            </span>
          </h4>
          <p className="my-6" data-aos="zoom-out-left">
            Welcome to Digibite Restaurant! We bring the vibrant flavors, offering dine-in, delivery, and takeaway options. At
            Digibite, we serve a delicious variety of dishes,
            made from fresh ingredients with a perfect mix of traditional and
            modern flavors. Whether you're dining in our cozy restaurant,
            grabbing a quick takeaway, or enjoying delivery, we guarantee a
            flavorful and memorable experience every time.
          </p>

          <Link to="/Contact">
            <button className="bg-[#4B8E10] rounded-md text-white py-1 px-4 hover:px-8 duration-300 ease-in-out">
              Contact Us
            </button>
          </Link>
        </div>

        <div>
          <img
            src={Aboutafroimg}
            className="rounded-md "
            data-aos="zoom-out-right"
          />
        </div>
      </div>
    </div>
  );
}

export default Aboutafro;
