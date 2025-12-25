import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation(); // Get current location

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Access cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cartItems); // Assuming cartItems are stored in state.cart.cartItems

  // Handle scroll event to add sticky effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && window.innerWidth >= 1024) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [location]); // Run this effect when location changes

  // Define links for navigation
  const links = [
    { path: "/", label: "HOME" },
    { path: "/About", label: "ABOUT US" },
    { path: "/Menu", label: "MENU" },
    { path: "/Dailyspecials", label: "DAILY SPECIALS" },
    { path: "/Gallery", label: "GALLERY" },
    { path: "/Contact", label: "CONTACT US" },
    { path: "/Reviews", label: "REVIEWS" },
    
  ];
  
  return (
    <div className="">
      <div
        className={`mx-auto z-[99999] text-sm fixed top-0 left-0 w-full flex items-center justify-between lg:backdrop-blur-none backdrop-blur-md bg-black/80 px-4 xl:px-12 text-white transition-all duration-500 ease-in-out ${
          isSticky
            ? "backdrop-blur-md bg-black/80 lg:border-b border-[gray] py-0 px-6 " // Translucent black with blur when sticky
            : "lg:bg-transparent lg:py-3 py-2" // Transparent background by default
        }`}
      >
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} className="w-20 lg:w-28" alt="Logo" />
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden lg:flex gap-8">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`border-b-2 hover:border-[#4B8E10] duration-500 ease-in-out ${
                location.pathname === path
                  ? "border-[#4B8E10]"
                  : "border-transparent"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="lg:flex gap-4 items-center hidden">
          <Link
            to="/Contact"
            className="bg-[transparent] py-2 px-4 rounded-md border border-white hover:bg-[#4B8E10] duration-500 ease-in-out"
          >
            RESERVATION
          </Link>

          <Link to="/Cart" className="flex gap-[3px]">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            <p className="font-bold">{cartItems.length}</p> {/* Show cart item length */}
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="fixed z-[9999] bottom-[-10%] lg:hidden mt-[70px] bg-black text-white flex flex-col gap-8 pt-20 min-h-[100vh] w-[100%] pl-4 backdrop-blur-md bg-black/80">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={toggleMenu}
              className={`border-b-2 w-[max-content] ${
                location.pathname === path
                  ? "border-[#4B8E10]"
                  : "border-transparent"
              }`}
            >
              {label}
            </Link>
          ))}

<Link to="/Cart" className="flex gap-[3px]">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            <p className="font-bold">{cartItems.length}</p> {/* Show cart item length */}
          </Link>
          
        </div>
      )}
    </div>
  );
}

export default Navbar;
