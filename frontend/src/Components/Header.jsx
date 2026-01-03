import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Import your images here
import Image1 from "../Assets/images/header-img1.jpg";
import Image2 from "../Assets/images/header-img2.jpg";
import Image3 from "../Assets/images/header-img3.jpg";

const images = [
  { src: Image1, heading: "Welcome To Digibite" },
  { src: Image2, heading: "RESERVE YOUR TABLE TODAY" },
  { src: Image3, heading: "TASTE THE JOY HERE" },
];

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="text-white mx-auto">
      <div
        className="header-background flex items-center justify-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex].src})`,
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div
          className="content text-center transition-opacity duration-1000 opacity-0 bg-black/50 h-[100vh] w-full justify-center flex items-center"
          style={{ opacity: 1 }}
        >
          <div>
            <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2" />
            <p>HELLO, NEW FRIEND!</p>
            <h1 className="lg:text-[8rem] w-[70%] mt-10 text-4xl lg:w-[70%] mx-auto lg:leading-[120px] font-bold header-heading">
              {images[currentIndex].heading}
            </h1>
            <div className="mt-10 flex justify-center gap-2 flex-wrap">
              <Link to="/Contact">
                <button className="px-4 py-2 bg-[#4B8E10] border rounded-md md:hover:px-8 duration-300 ease-in-out">
                  CONTACT US
                </button>
              </Link>
              <Link to="/Menu">
                <button className="px-4 py-2 bg-transparent border border-white rounded-md md:hover:px-8 duration-300 ease-in-out">
                  OPEN MENU
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="navigation absolute top-1/2 transform -translate-y-1/2 flex space-x-4">
          <button
            className="nav-button hover:bg-[#4B8E10]"
            onClick={handlePrevious}
            aria-label="Previous"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="nav-button hover:bg-[#4B8E10]"
            onClick={handleNext}
            aria-label="Next"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
