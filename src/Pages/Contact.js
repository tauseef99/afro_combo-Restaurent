import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons"; // Import solid icon
import Contactinfo from "../Components/Contactinfo";
import Contactform from "../Components/Contactform";

function Contact() {
  // Create a ref for the Contactinfo section
  const contactInfoRef = useRef(null);

  // Function to scroll to the Contactinfo section smoothly
  const scrollToContactInfo = () => {
    contactInfoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="Contact-Header All-Header flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-5xl">CONTACT US</h3>
          <p className="py-4">
            Get in touch with us for any questions or support!
          </p>
          <div className="flex mt-10 justify-center items-center">
            <FontAwesomeIcon
              icon={faDownLong}
              className="text-2xl transform rotate-180 animate-bounce text-[white] cursor-pointer"
              onClick={scrollToContactInfo} // Attach click event
            />
          </div>
        </div>
      </div>

      {/* Attach the ref to the Contactinfo section */}
      <div ref={contactInfoRef}>
        <Contactinfo />
      </div>

      <Contactform />
      <Footer />
    </div>
  );
}

export default Contact;
