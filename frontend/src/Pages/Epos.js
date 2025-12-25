import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function EposSystem() {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <div className="All-Header EPOS-System flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-4xl md:text-5xl">
            EPOS SYSTEM
          </h3>
          <p className="py-4 px-2">
            Seamlessly manage your business operations with powerful tools.
          </p>
        </div>
      </div>

      <div className="card-container my-10 mx-auto flex flex-wrap justify-center gap-8">
        {/* Card 1 */}
        <div
          className="card w-64 p-6 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-xl transition-transform"
          onClick={() => handleNavigation("/order-management")}
        >
          <h3 className="text-xl font-bold">Order Management</h3>
          <p className="mt-2 text-gray-600">
            Manage customer orders and track status.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="card w-64 p-6 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-xl transition-transform"
          onClick={() => handleNavigation("/payment-processing")}
        >
          <h3 className="text-xl font-bold">Payment Processing</h3>
          <p className="mt-2 text-gray-600">
            Handle cash and card payments seamlessly.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="card w-64 p-6 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-xl transition-transform"
          onClick={() => handleNavigation("/sales-overview")}
        >
          <h3 className="text-xl font-bold">Sales Overview</h3>
          <p className="mt-2 text-gray-600">
            View sales statistics and performance.
          </p>
        </div>

        {/* Card 4 */}
        <div
          className="card w-64 p-6 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-xl transition-transform"
          onClick={() => handleNavigation("/item-list")}
        >
          <h3 className="text-xl font-bold">Item List</h3>
          <p className="mt-2 text-gray-600">
            Manage your inventory and item details.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EposSystem;
