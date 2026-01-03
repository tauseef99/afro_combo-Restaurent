import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import Aboutafro from "../Components/Aboutafro";
import Team from "../Components/Team";
import Testimonial from "../Components/Testimonial";
import Chooseus from "../Components/Chooseus";
import Reservation from "../Components/Reservation";
// import Aboutvideo from "../Components/Aboutvideo";

function About() {
  // Create a ref for the Aboutinfo component
  const aboutInfoRef = useRef(null);

  // Function to scroll to the Aboutinfo component
  const scrollToAboutInfo = () => {
    aboutInfoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="All-Header About-Header flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-5xl">ABOUT US</h3>
          <p className="py-4">Find Out More About Us!</p>
          <div className="flex mt-10 justify-center items-center">
            <FontAwesomeIcon
              icon={faDownLong}
              className="text-2xl transform rotate-180 animate-bounce text-[white] cursor-pointer"
              onClick={scrollToAboutInfo} // Add the click event
            />
          </div>
        </div>
      </div>

      {/* Attach the ref to the Aboutinfo component */}
      <div ref={aboutInfoRef}>
        <Aboutafro />
      </div>
      {/* <Aboutvideo /> */}
      {/* <Team /> */}
      <Chooseus />
      <Testimonial />
      <Reservation />
      <Footer />
    </div>
  );
}

export default About;
