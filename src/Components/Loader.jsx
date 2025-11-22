import React from "react";
import loaderimg from "../Assets/images/Spinner.gif";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[999000999] flex items-center justify-center z-50">
      <img src={loaderimg} alt="Loading..." className="w-24 h-24" />
    </div>
  );
};

export default Loader;
