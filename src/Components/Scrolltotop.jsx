// ScrollToTop.js
import React, { useEffect, useState } from "react";

const Scrolltotop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;

    setScrollPercent(scrollPercentage);
    setIsVisible(scrollPosition > 300); // Show button after scrolling 300px
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`z-[9999999] fixed hover:text-2xl bottom-5 right-5 flex items-center justify-center w-12 h-12 rounded-full bg-[#4B8E10] text-white cursor-pointer transition-all duration-300 
                ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"} 
                border-4 border-[#B3A64D]`}
      style={{
        borderColor: `#4B8E10, ${scrollPercent / 100})`,
      }}
    >
      ↑
    </div>
  );
};

export default Scrolltotop;
