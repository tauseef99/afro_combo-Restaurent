import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons"; // Import solid icon
import Reviewsinfo from "../Components/Reviewsinfo";
import Testimonials from "../Components/Testimonial";
import Reservation from "../Components/Reservation";

function Reviews() {
  // Create a ref for the Reviewsinfo section
  const reviewsInfoRef = useRef(null);

  // Function to scroll to the Reviewsinfo section smoothly
  const scrollToReviewsInfo = () => {
    reviewsInfoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="All-Header Reviews flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-4xl md:text-5xl">
            REVIEWS
          </h3>
          <p className="py-4 px-2">
            Quick, honest feedback on our delicious dishes and dining
            experience!
          </p>
          <div className="flex mt-10 justify-center items-center">
            <FontAwesomeIcon
              icon={faDownLong}
              className="text-2xl transform rotate-180 animate-bounce text-[white] cursor-pointer"
              onClick={scrollToReviewsInfo} // Attach click event
            />
          </div>
        </div>
      </div>

      {/* Attach the ref to the Reviewsinfo section */}
      <div ref={reviewsInfoRef}>
        <Reviewsinfo />
      </div>

      <Testimonials />
      <Reservation />
      <Footer />
    </div>
  );
}

export default Reviews;
