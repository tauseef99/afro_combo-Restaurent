import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import Galleryimages from "../Components/Galleryimages";
import Reservation from "../Components/Reservation";

function Gallery() {
  // Create a ref for the Galleryimages component
  const galleryRef = useRef(null);

  // Function to scroll smoothly to the gallery section
  const handleScroll = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="All-Header Gallery-Header flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-4xl md:text-5xl">
            GALLERY
          </h3>
          <p className="py-4 px-2">
            A visual showcase of our mouthwatering dishes and vibrant dining
            atmosphere!
          </p>
          <div className="flex mt-10 justify-center items-center">
            <FontAwesomeIcon
              icon={faDownLong}
              className="text-2xl transform rotate-180 animate-bounce text-[white] cursor-pointer"
              onClick={handleScroll} // Add onClick handler
            />
          </div>
        </div>
      </div>

      {/* Attach the ref to the Galleryimages component */}
      <div ref={galleryRef}>
        <Galleryimages />
      </div>
      <Reservation />
      <Footer />
    </div>
  );
}

export default Gallery;
