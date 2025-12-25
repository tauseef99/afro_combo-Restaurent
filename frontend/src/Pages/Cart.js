import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import Cartorders from "../Components/Cartorders";
import { ToastContainer } from "react-toastify";
import Reservation from "../Components/Reservation";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, removeAllFromCart, clearCart } from "../reduxToolkit/cartSlice";


function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  
  const cartBottomRef = useRef(null); // Ref for bottom of Cartorders

  const scrollToCartBottom = () => {
    cartBottomRef.current?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to bottom
  };

  
  

  return (
    <div>
      <ToastContainer className="mt-20 z-[99999] w-[90%] sm:w-[300px] ml-auto rounded-xl" />
      <Navbar />
      <div className="Contact-Header All-Header flex text-white items-center justify-center text-center">
        <div>
          <h3 className="header-heading font-semibold text-5xl">CART</h3>
          <p className="py-4 px-2">
            Shopping for your favorite meals is always a delightful experience!
          </p>
          <div className="flex mt-10 justify-center items-center">
            <FontAwesomeIcon
              icon={faDownLong}
              className="text-2xl transform rotate-180 animate-bounce text-[white] cursor-pointer"
              onClick={scrollToCartBottom} // Call the new scroll function
            />
          </div>
        </div>
      </div>

      <div className="p-[7%] container mx-auto" ref={cartBottomRef}>
        <Cartorders
          cartItems={cartItems}
          addToCart={(item) => dispatch(addToCart(item))}
          removeFromCart={(id) => dispatch(removeFromCart(id))}
          removeAllFromCart={(id) => dispatch(removeAllFromCart(id))}
          clearCart={() => dispatch(clearCart())}
        />

       
        
      </div>

      <Reservation />
      <Footer />
    </div>
  );
}

export default Cart;
