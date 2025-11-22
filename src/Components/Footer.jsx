import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Booktable from "./Booktable";
import Footerimg from "../Assets/images/logo.png";

const links = [
  { to: "/", text: "HOME" },
  { to: "/About", text: "ABOUT US" },
  { to: "/Contact", text: "CONTACT US" },
  { to: "/Menu", text: "MENU" },
];

const moreLinks = [
  { to: "/Dailyspecials", text: "DAILY SPECIALS" },
  { to: "/Gallery", text: "GALLERY" },
  { to: "/Reviews", text: "REVIEWS" },
  { to: "/Cart", text: "SHOPPING CART" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/afrocomborestaurant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: faInstagram,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61554349216661",
    icon: faFacebook,
  },
];

function Footer() {
  const location = useLocation(); // Get the current location

  const isActive = (path) => location.pathname === path;

  const linkStyle = (active) =>
    active
      ? "text-[#4B8E10] border-b border-[#4B8E10]"
      : "hover:text-[#4B8E10] hover:border-b hover:border-[#4B8E10]";

  return (
    <>
      <Booktable />
      <div className="bg-[black] p-[7%] border-t border-white">
        <div className="text-white grid pt-10 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between container">
          <div>
            <Link to="/">
              <img src={Footerimg} className="w-[28]" alt="Footer Logo" />
            </Link>
            <p className="w-[90%]">
              Thank you for visiting Afro Combo online! We look forward to
              welcoming you in person for an unforgettable dining experience.
              See you soon!
            </p>
          </div>

          <div className="flex md:justify-center">
            <div>
              <h4 className="font-semibold text-xl mb-4">LINKS</h4>
              {links.map(({ to, text }) => (
                <Link to={to} key={text}>
                  <p
                    className={`text-sm mb-4 w-[max-content] duration-300 ease-in-out ${linkStyle(
                      isActive(to)
                    )}`}
                  >
                    {text}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex md:justify-center">
            <div>
              <h4 className="font-semibold text-xl mb-4">MORE</h4>
              {moreLinks.map(({ to, text }) => (
                <Link to={to} key={text}>
                  <p
                    className={`text-sm mb-4 w-[max-content] duration-300 ease-in-out ${linkStyle(
                      isActive(to)
                    )}`}
                  >
                    {text}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex lg:justify-center">
            <div>
              <h4 className="font-semibold text-xl mb-4">FOLLOW US</h4>
              <div className="flex gap-4 text-2xl">
                {socialLinks.map(({ href, icon }, index) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className="hover:text-[#4B8E10] duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="subheader text-sm p-[10px] text-center text-[white] bg-[#4B8E10]">
        <p>Copyright © 2025 afrocombo.com - All Rights Reserved.</p>
      </div>
    </>
  );
}

export default Footer;
