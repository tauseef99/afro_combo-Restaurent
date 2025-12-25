import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faSeedling,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faUtensils,
    title: "Menu for every taste",
    description:
      "Delicious options crafted to satisfy every palate and preference.",
  },
  {
    icon: faSeedling,
    title: "Always fresh ingredients",
    description:
      "Committed to using only the freshest ingredients for every dish.",
  },
  {
    icon: faUserTie,
    title: "Experienced chefs",
    description:
      "Skilled chefs dedicated to creating exceptional culinary experiences.",
  },
];

function Chooseus() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once or every time you scroll
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className="container mx-auto text-center p-[7%] text-[#1A2F33] text-white mt-16 md:mt-0">
      <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2" />
      <p className="text-[#B3A64D]">FEATURES</p>
      <h3 className="header-heading text-4xl lg:text-6xl my-4">
        Why people choose us?
      </h3>
      <p>
        People choose us for our quality, reliability, and exceptional service.
      </p>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 mt-28 gap-12">
        {features.map((feature, index) => (
          <div key={index} data-aos="zoom-out-up">
            <FontAwesomeIcon
              data-aos="zoom-out-up"
              icon={feature.icon}
              className="w-20 h-20 text-[#B8B15D] mx-auto"
            />
            <h4
              className="header-heading my-4 text-2xl lg:text-4xl"
              data-aos="zoom-out-up"
            >
              {feature.title}
            </h4>
            <p data-aos="zoom-out-up">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chooseus;
