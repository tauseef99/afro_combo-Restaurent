// Homegallery.js

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay"; // Optional for better performance with autoplay
import img1 from "../Assets/images/gallery-img1.png";
import img2 from "../Assets/images/gallery-img2.png";
import img3 from "../Assets/images/gallery-img3.png";
import img4 from "../Assets/images/gallery-img9.png";
import img5 from "../Assets/images/gallery-img5.png";
import img6 from "../Assets/images/gallery-img6.png";
import img7 from "../Assets/images/gallery-img7.png";
import img8 from "../Assets/images/gallery-img8.png";

import { Link } from "react-router-dom";

// Import required modules
import { EffectCoverflow, Autoplay } from "swiper/modules";

// Array of image data (You can add more images here)
const galleryImages = [
  { id: 1, src: img4 },
  { id: 2, src: img2 },
  { id: 3, src: img3 },
  { id: 4, src: img4 },
  { id: 5, src: img5 },
  { id: 6, src: img6 },
  { id: 7, src: img4 },
  { id: 8, src: img8 },
];

const Homegallery = () => {
  return (
    <div className="home-gallery 2xl:py-4 my-20 md:my-0">
      <div className="p-[7%] container mx-auto">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000, // Adjust delay (in milliseconds)
            disableOnInteraction: false, // Keeps autoplay active after user interactions
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {/* Map through the gallery images */}
          {galleryImages.map((image) => (
            <SwiperSlide
              key={image.id}
              className="w-[250px] h-[250px] swiper-home sm:w-[400px] sm:h-[400px] bg-cover bg-center rounded-md"
            >
              <img
                src={image.src}
                alt={`Gallery Image ${image.id}`}
                className="block w-[100%] mx-auto h-[250px] sm:h-[400px] object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="mt-10 flex mx-auto bg-[#4A8D12] py-2 px-6 hover:px-10 duration-300 ease-in-out rounded-md text-white">
          <Link to="/Gallery" className="inline-block">
            View Full Gallery
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Homegallery;
