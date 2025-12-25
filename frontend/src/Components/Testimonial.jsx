import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation CSS
import { Pagination, Autoplay, Navigation } from "swiper/modules"; // Import Navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reviewimg2 from "../Assets/images/review-img2.jpeg";
import reviewimg5 from "../Assets/images/review-img5.jpeg";
import reviewimg4 from "../Assets/images/review-img4.jpeg";
import reviewimg6 from "../Assets/images/review-img6.png";
import reviewimg3 from "../Assets/images/review-img3.jpeg";
import reviewimg1 from "../Assets/images/review-img1.jpeg";
import reviewimg7 from "../Assets/images/review-img7.png";
import reviewimg8 from "../Assets/images/review-img8.jpg";
import reviewimg9 from "../Assets/images/review-img9.jpg";
import reviewimg10 from "../Assets/images/review-img10.jpg";



import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"; // Import icons

// Sample data for testimonials
const testimonials = [
  {
    id: 1,
    heading: "Dine in · Lunch",
    text: "It was nice to finally have a taste of home.",
    name: "Dr. Bolade Alabi.",
    img: reviewimg1, // You can replace this with a different image for each testimonial.
  },
  {
    id: 2,
    heading: "Dinner",
    text: "The oxtail stew is very tasty! Always nice to have something different and halal that isn't the usual pizza/kebab/burgers!",
    name: "Oh That Wan.",
    img: reviewimg4, // Replace with another image.
  },
  {
    id: 3,
    heading: "Lunch",
    text: "Tried on two occasions now and won’t be the last! Great to get authentic African and Caribbean cuisine. Full of flavour, Friendly,",
    name: "Charlotte Cohen.",
    img: reviewimg7, // Replace with another image.
  },
  {
    id: 4,
    heading: "Dine in · Dinner",
    text: "The oxtail, Jollof and Mac & Cheese combo.. Heavenly .. Grea food I must say 🫡👏🏿🫡",
    name: "BOSS OBI.",
    img: reviewimg6, // Replace with another image.
  },
  {
    id: 5,
    heading: "Dinner",
    text: "If you are in Buckingham, please visit Afro Combo for your delicious tasting African dishes. You will love every meal they serve.",
    name: "Daria Gavrilova.",
    img: reviewimg3, // Replace with another image.
  },
  {
    id: 6,
    heading: "Lunch",
    text: "Takeaway",
    name: "Omotanwa Sholarin.",
    img: reviewimg9, // Replace with another image.
  },
  {
    id: 7,
    heading: "Dine in · Lunch",
    text: "My go to place for Nigerian food. Lively staff, tasty food.",
    name: "ADEMOLA OLUGBENGA.",
    img: reviewimg2, // Replace with another image.
  },
  {
    id: 8,
    heading: "Lunch",
    text: "First time visiting the other day, loved the food, the staff and the feel of the whole place. Will defiantly be returning to try more good good food!",
    name: "Samuel SDG.",
    img: reviewimg10, // Replace with another image.
  },
  {
    id: 9,
    heading: "Lunch",
    text: "Really delightful staff who will offer some tasters to help you make up your mind. The food is delicious Bumboclart!.",
    name: "Oran Cutland.",
    img: reviewimg5, // Replace with another image.
  },
  {
    id: 10,
    heading: "Delivery · Breakfast",
    text: "I've been wanting to come here since the restaurant opened. The food was amazing! I went for a combo box and ended up having a bit of everything.",
    name: "Nicolo Tagliarini.",
    img: reviewimg8, // Replace with another image.
  },
];

function Testimonial() {
  return (
    <div className="relative py-2 mt-16 md:mt-0">
      <div className="p-[7%] container mx-auto">
        <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2 text-center" />
        <p className="font-semibold pb-3 text-center text-[#B3A64D]">
          TESTIMONIALS
        </p>
        <h3 className="text-3xl sm:text-5xl header-heading py-4 text-center text-white">
          What Our Visitors Say
        </h3>
        <p className="sm:w-[70%] mx-auto text-white text-center pt-3">
          Discover what our amazing visitors are saying about their
          unforgettable experiences with us! Their stories of joy, excitement,
          and satisfaction speak volumes about the incredible moments they've
          enjoyed here.
        </p>

        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".prev-button", // Custom class for the previous button
            nextEl: ".next-button", // Custom class for the next button
          }}
          modules={[Pagination, Autoplay, Navigation]} // Add Navigation module
          className="mySwiper mt-20"
          breakpoints={{
            // When the window is >= 320px (mobile screens)
            320: {
              slidesPerView: 1,
            },
            // When the window is >= 640px (small screens)
            768: {
              slidesPerView: 2,
            },
            // When the window is >= 1024px (medium screens and above)
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              className="h-[auto] cursor-pointer"
            >
              <div className="flex flex-col justify-between h-[300px] lg:h-[270px]">
                <div>
                  <h3 className="header-heading text-3xl">
                    {testimonial.heading}
                  </h3>
                  <p className="py-6">{testimonial.text}</p>
                </div>
                <div className="flex items-center justify-end pr-[10%] gap-3 mt-4 border-t border-[black] py-4">
                  {/* Use the mapped image here */}
                  <img
                    src={testimonial.img}
                    className="h-12 w-12 object-cover rounded-full"
                    alt={testimonial.name}
                  />
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left and right navigation icons */}
        <div className="hidden sm:block prev-button absolute left-0 lg:left-4 top-[65%] transform -translate-y-1/2 z-20 p-3 cursor-pointer">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-2xl text-[#B3A64D]"
          />
        </div>
        <div className="hidden sm:block next-button absolute right-0 lg:right-4 top-[65%] transform -translate-y-1/2 z-20 p-3 cursor-pointer">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-2xl text-[#B3A64D]"
          />
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
