import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import Ourmenu from "../Components/Ourmenu";
import Reservation from "../Components/Reservation";

function Menu() {
  // Create a ref for the Ourmenu component
  const menuRef = useRef(null);

  // Function to scroll to the Ourmenu component
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="All-Header Menu-Header flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-4xl md:text-5xl">
            AFROCOMBO MENU
          </h3>
          <p className="py-4 px-2">
            Discover a variety of flavorful dishes crafted with fresh
            ingredients.
          </p>
          <div className="flex mt-10 justify-center items-center">
            <FontAwesomeIcon
              icon={faDownLong}
              className="text-2xl transform rotate-180 animate-bounce text-[white] cursor-pointer"
              onClick={scrollToMenu} // Add the click event
            />
          </div>
        </div>
      </div>

      {/* Attach the ref to the Ourmenu component */}
      <div ref={menuRef}>
        <Ourmenu />
      </div>
      <Reservation />
      <Footer />
    </div>
  );
}

export default Menu;
