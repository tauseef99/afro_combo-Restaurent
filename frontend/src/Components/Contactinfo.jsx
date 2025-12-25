import { React, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

// Reusable ContactCard Component
function ContactCard({ icon, title, details }) {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once or every time you scroll
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div>
      <FontAwesomeIcon
        icon={icon}
        className="w-20 h-20 text-[#B3A64D] mx-auto"
      />
      <h4 className="text-3xl header-heading py-6">{title}</h4>
      {details.map((detail, index) => (
        <p key={index} className="text-gray-300">
          {detail}
        </p>
      ))}
    </div>
  );
}

function Contactinfo() {
  const contactData = [
    {
      icon: faEnvelope,
      title: "Write Us",
      details: ["info@afrocombo.com", "reservation@afrocombo.com"],
    },
    {
      icon: faPhone,
      title: "Call Us",
      details: ["+44 1280 821920"],
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      details: ["14 Market Square, Buckingham MK18 1NW, United Kingdom"],
    },
  ];

  return (
    <div className="my-16 text-center container px-4 mx-auto text-white">
      <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2" />
      <p className="font-semibold pb-3 text-[#B3A64D]">GET IN TOUCH</p>
      <h3 className="text-4xl sm:text-5xl header-heading py-4">
        Contact Information
      </h3>

      <div
        className="my-20 grid md:grid-cols-3 sm:grid-cols-2 gap-8 justify-center items-center"
        data-aos="zoom-in"
      >
        {contactData.map((contact, index) => (
          <ContactCard
            key={index}
            icon={contact.icon}
            title={contact.title}
            details={contact.details}
          />
        ))}
      </div>
    </div>
  );
}

export default Contactinfo;
