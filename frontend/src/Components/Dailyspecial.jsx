import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import img1 from "../Assets/images/gallery-img8.png";
import img2 from "../Assets/images/gallery-img9.png";
import img3 from "../Assets/images/gallery-img5.png";
import img4 from "../Assets/images/gallery-img28.png";
import img5 from "../Assets/images/gallery-img37.jpg";
import img6 from "../Assets/images/gallery-img35.jpg";
import banner from "../Assets/images/Daily-img1.jpg";

// Data for daily specials

const specialsData = [
  {
    img: img1,
    day: "MONDAY",
    price: "£8.99",
    description:
      "there will be the description of the products and its all details , this is static for now.",
  },
  {
    img: img2,
    day: "WEDNESDAY",
    price: "£8.99",
    description:
      "there will be the description of the products and its all details , this is static for now.",
  },
  {
    img: img3,
    day: "FRIDAY",
    price: "£8.99",
    description:
      "there will be the description of the products and its all details , this is static for now.",
  },
  {
    img: img4,
    day: "TUESDAY",
    price: "£15",
    description:
      "there will be the description of the products and its all details , this is static for now.",
  },
  {
    img: img5,
    day: "THURSDAY",
    price: "£15",
    description:
      "there will be the description of the products and its all details , this is static for now.",
  },
  {
    img: img6,
    day: "SATURDAY",
    price: "£8.99",
    description:
      "there will be the description of the products and its all details , this is static for now.",
  },
];

function Dailyspecial() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once or every time you scroll
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className=" text-white mx-auto bg-[black]  pt-16">
      <div className="mx-auto w-[100%] px-[7%] mx-auto container">
        <img src={banner} className="w-[100%] rounded-lg" alt="Banner" />
      </div>

      <div className="md:flex justify-center gap-4 bg-black px-[7%] mx-auto container">
        {/* Left Column */}
        <div className="md:w-[50%]" data-aos="zoom-out-up">
          {specialsData.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="text-center border-b border-[white] pb-12 py-12"
            >
              <img
                src={item.img}
                className="md:h-[300px] lg:h-[450px] object-cover w-[100%] rounded-lg"
                alt={item.day}
              />
              <h2 className="text-4xl lg:text-6xl header-heading mt-6">
                {item.day}
              </h2>
              <div className="flex items-center gap-2 justify-center my-4">
                <p className="text-2xl lg:text-4xl text-[#9B8A3B]">
                  {item.price}
                </p>
                <p className=" text-2xl text-[#9B8A3B]">All Day</p>
              </div>
              <p className="lg:w-[70%] mx-auto">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-r border-[white] h-[full]"></div>

        {/* Right Column */}
        <div className="md:w-[50%]" data-aos="zoom-out-down">
          {specialsData.slice(3).map((item, index) => (
            <div
              key={index}
              className="text-center border-b border-[white] pb-12 py-12"
            >
              <img
                src={item.img}
                className="md:h-[300px] lg:h-[450px] object-cover w-[100%] rounded-lg"
                alt={item.day}
              />
              <h2 className="text-4xl lg:text-6xl header-heading mt-6">
                {item.day}
              </h2>
              <div className="flex items-center gap-2 justify-center my-4">
                <p className="text-2xl lg:text-4xl text-[#9B8A3B]">
                  {item.price}
                </p>
                <p className=" text-2xl text-[#9B8A3B]">All Day</p>
              </div>
              <p className="lg:w-[70%] mx-auto">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Section */}
      <div
        className="p-[7%] mx-auto bg-[black] container"
        data-aos="zoom-out-up"
      >
        {/* <div className="text-center border-b border-[white] pb-12 md:w-[50%] mx-auto">
          <img
            src={img4}
            className="md:h-[300px] lg:h-[450px] object-cover w-[100%] rounded-lg"
            alt="MONDAY"
          />
          <h2 className="text-4xl lg:text-6xl header-heading mt-6">SUNDAY</h2>
          <div className="flex items-center gap-2 justify-center my-4">
            <p className="text-2xl lg:text-4xl text-[#9B8A3B]">£5.99</p>
            <p className=" text-2xl text-[#9B8A3B]">All Day</p>
          </div>
          <p className="lg:w-[70%] mx-auto">
            there will be the description of the products and its all details ,
            this is static for now.
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Dailyspecial;
