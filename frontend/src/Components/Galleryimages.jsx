import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import img1 from "../Assets/images/gallery-img1.png";
import img2 from "../Assets/images/gallery-img2.png";
import img3 from "../Assets/images/gallery-img3.png";
import img4 from "../Assets/images/gallery-img4.png";
import img5 from "../Assets/images/gallery-img5.png";
import img6 from "../Assets/images/gallery-img6.png";
import img7 from "../Assets/images/gallery-img7.png";
import img8 from "../Assets/images/gallery-img8.png";
import img9 from "../Assets/images/gallery-img9.png";
import img10 from "../Assets/images/gallery-img10.png";
import img11 from "../Assets/images/gallery-img11.png";
import img12 from "../Assets/images/gallery-img12.png";
import img13 from "../Assets/images/gallery-img13.png";
import img14 from "../Assets/images/gallery-img14.png";
import img15 from "../Assets/images/gallery-img15.png";
import img16 from "../Assets/images/gallery-img16.png";
import img17 from "../Assets/images/gallery-img17.png";
import img18 from "../Assets/images/gallery-img18.png";
import img19 from "../Assets/images/gallery-img19.png";
import img20 from "../Assets/images/gallery-img20.jpg";
import img21 from "../Assets/images/gallery-img21.png";
import img22 from "../Assets/images/gallery-img22.png";
import img23 from "../Assets/images/gallery-img23.png";
import img24 from "../Assets/images/gallery-img24.png";
import img25 from "../Assets/images/gallery-img25.png";
import img26 from "../Assets/images/gallery-img26.png";
import img27 from "../Assets/images/gallery-img27.png";
import img28 from "../Assets/images/gallery-img28.png";
import img29 from "../Assets/images/gallery-img29.jpg";
import img30 from "../Assets/images/gallery-img30.jpg";
import img31 from "../Assets/images/gallery-img31.jpg";
import img32 from "../Assets/images/gallery-img32.jpg";
import img33 from "../Assets/images/gallery-img33.jpg";
import img34 from "../Assets/images/gallery-img34.jpg";
import img35 from "../Assets/images/gallery-img35.jpg";
import img36 from "../Assets/images/gallery-img36.jpg";
import img37 from "../Assets/images/gallery-img37.jpg";
import img38 from "../Assets/images/gallery-img38.jpg";
import img39 from "../Assets/images/gallery-img39.jpg";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
  img37,
  img38,
  img39,
];

const IMAGES_PER_PAGE = 12;

function Galleryimages() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  // Create a ref to scroll the page to the gallery section
  const galleryRef = useRef(null);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsOpen(false);
    }, 300);
  };

  const nextImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop(); // Scroll to top when page changes
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      scrollToTop(); // Scroll to top on next page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      scrollToTop(); // Scroll to top on previous page
    }
  };

  // Function to scroll the gallery section into view
  const scrollToTop = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  return (
    <div className="text-center p-[7%] container mx-auto" ref={galleryRef}>
      {/* Image Gallery */}
      <div className="sm:grid flex flex-wrap justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mx-auto">
        {paginatedImages.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden h-[300px] bg-[#4A8C12] cursor-pointer w-[100%] rounded-lg"
            onClick={() =>
              openModal((currentPage - 1) * IMAGES_PER_PAGE + index)
            }
          >
            <img
              src={img}
              alt={`Gallery Image ${index + 1}`}
              className="brightness-75 w-[100%] hover:brightness-100 rounded-lg w-full h-full duration-300 ease-in-out rounded-sm hover:scale-105 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-10 flex gap-2 justify-center">
        <button
          className={`bg-[#4B8E10] text-white py-1 px-3 rounded-sm brightness-90 hover:brightness-100 duration-300 ease-in-out ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`bg-[#B4A54D] text-white px-3 rounded-sm duration-300 ease-in-out hover:brightness-100 ${
              currentPage === i + 1 ? "brightness-100" : "brightness-75"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`bg-[#4B8E10] text-white py-1 px-3 rounded-sm brightness-90 hover:brightness-100 duration-300 ease-in-out ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* Modal Section */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-[black] z-[99999999999] bg-opacity-90 flex justify-center items-center transition-all duration-300 ease-in-out`}
          style={{ opacity: isAnimating ? 0 : 1 }}
        >
          <div
            className="relative flex justify-center items-center max-w-[90%] max-h-[90%] transition-transform duration-300 ease-in-out"
            style={{ transform: isAnimating ? "scale(0.9)" : "scale(1)" }}
          >
            <img
              src={images[currentIndex]}
              alt="Large view"
              className="rounded-md max-h-[80vh] w-auto max-w-full transition-opacity duration-300 ease-in-out"
              style={{ opacity: isAnimating ? 0 : 1 }}
            />
            <button
              className="absolute top-4 right-4 text-white text-sm sm:text-xl bg-[#498B11] brightness-90 border border-white py-1 px-2 rounded-sm hover:brightness-100 duration-300 ease-in-out"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button
              className="absolute left-[0px] sm:left-[-50px] text-white text-sm sm:text-xl bg-[#498B11] border border-white py-1 px-2 brightness-90 rounded-sm hover:brightness-100 duration-300 ease-in-out"
              onClick={prevImage}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="absolute right-[0px] sm:right-[-50px] text-white text-sm sm:text-xl bg-[#498B11] border border-white py-1 px-2 brightness-90 rounded-sm hover:brightness-100 duration-300 ease-in-out"
              onClick={nextImage}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Galleryimages;
