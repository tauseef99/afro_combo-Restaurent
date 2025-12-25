import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons"; // Import solid icon
import Dailyspecial from "../Components/Dailyspecial";
import Reservation from "../Components/Reservation";

function Dailyspecials() {
  // Create a ref for the Dailyspecial component
  const dailySpecialRef = useRef(null);

  // Function to handle smooth scrolling
  const scrollToSpecial = () => {
    dailySpecialRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="All-Header Dailyspecial flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-4xl md:text-5xl">
            DAILY SPECIALS
          </h3>
          <p className="py-4 px-2">
            Fresh, tasty dishes created each day to delight your palate!
          </p>
          <div className="flex mt-10 justify-center items-center">
            <FontAwesomeIcon
              icon={faDownLong}
              className="text-2xl transform rotate-180 animate-bounce text-[white] cursor-pointer"
              onClick={scrollToSpecial} // Add click handler here
            />
          </div>
        </div>
      </div>

      {/* Use the ref on the Dailyspecial component */}
      <div ref={dailySpecialRef}>
        <Dailyspecial />
      </div>
      <Reservation />
      <Footer />
    </div>
  );
}

export default Dailyspecials;
