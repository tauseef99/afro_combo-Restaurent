import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft, faShoppingBag, faArrowRight, faTimes, faCashRegister, faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Cartorders({ cartItems, removeFromCart, addToCart, removeAllFromCart, clearCart }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalWithFee = (totalAmount + 0.9).toFixed(2);

  const handleCheckout = (method) => {
    setPaymentMethod(method);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const confirmOrder = async (e) => {
  //   e.preventDefault();
  
  //   // Validate required fields
  //   if (!formData.name || !formData.address || !formData.phone) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }
  
  //   // Immediately show confirmation to user
  //   setConfirmationOpen(true);
  //   clearCart();
  //   setPaymentMethod("");
  
  //   // Prepare order data
  //   const orderData = {
  //     name: formData.name,
  //     address: formData.address,
  //     phone: formData.phone,
  //     email: formData.email,
  //     cartItems,
  //     total: totalWithFee,
  //     orderDate: new Date().toISOString()
  //   };
  
  //   // Attempt to send data to server in background
  //   try {
  //     const response = await fetch("http://localhost:5000/api/order", {
  //       method: "POST",
  //       headers: { 
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${localStorage.getItem('token')}` // If using auth
  //       },
  //       body: JSON.stringify(orderData)
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     // Optional: Log successful submission
  //     console.log("Order data successfully submitted to server");
  
  //   } catch (error) {
  //     console.error("Order submission error:", error);
  //     // Optional: Store order locally if server is down
  //     if (error.message.includes("Failed to fetch")) {
  //       const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
  //       pendingOrders.push(orderData);
  //       localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
  //     }
  //   }
  
  //   // Clear form regardless of server success
  //   setFormData({
  //     name: "",
  //     address: "",
  //     phone: "",
  //     email: ""
  //   });
  // };

  //updated conform code 

  const confirmOrder = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    setConfirmationOpen(true);
    clearCart();
    setPaymentMethod("");
  
    const orderData = {
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      cartItems,
      total: totalWithFee,
      orderDate: new Date().toISOString()
    };
  
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log("Order data successfully submitted to server");
  
    } catch (error) {
      console.error("Order submission error:", error);
  
      if (error.message.includes("Failed to fetch")) {
        const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
        pendingOrders.push(orderData);
        localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
      }
    }
  
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: ""
    });
  };
  
  
  const closeConfirmation = () => {
    setConfirmationOpen(false);
    navigate("/");
  };

  return (
    <div className="border-[#C2B66C] border-2 p-4 lg:p-8 rounded-2xl mt-4 lg:mt-0 w-full shadow-2xl shadow-lg shadow-cyan-black/50">
      <div className="text-white border-2 border-[#C2B66C] p-6 rounded-2xl" >
        <p style={{ color: 'yellow', fontSize: '18px', fontWeight: 'bold' }}>
          Delivery is available within the Buckingham area not too much far from Buckingham.
        </p>
        <h4 className="text-2xl font-semibold">Order Summary</h4>
        <p className="py-2">{cartItems.length} Items</p>
        <p>Total to Pay: £{totalAmount.toFixed(2)}</p>
      </div>

      <div className="text-white py-4 rounded-2xl mt-4" >
        {cartItems.length === 0 ? (
          <div className="block text-center">
            <FontAwesomeIcon icon={faShoppingBag} className="text-[100px] mx-auto" />
            <p className="text-center pt-4 w-[80%] mx-auto mb-10">
              Your cart is empty. Start adding delicious items from the menu!
            </p>
            <Link to="/Menu" className="bg-[#4B8E10] text-white px-4 hover:px-8 duration-300 ease-in-out py-2 rounded-md"><FontAwesomeIcon icon={faArrowLeft} className="text-sm"/> Menu</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              className="sm:flex items-center justify-between my-4 shadow-lg shadow-cyan-black/50 py-6 px-4 lg:px-8 rounded-2xl border-2 border-[#C2B66C]"
              key={item.id}
            >
              <div className="flex items-center justify-center sm:justify-start gap-8 sm:w-[20%]">
                <button onClick={() => removeAllFromCart(item.id)}>
                  <FontAwesomeIcon icon={faTimes} className="font-bold bg-[#4B8E10] py-2 px-3 rounded-md text-xl brightness-90 duration-300 ease-in-out hover:brightness-100"/>
                </button>
                <img src={item.img} alt={item.title} className="h-16 w-16 rounded-md" />
              </div>

              <div className="flex md:text-xl text-sm font-semibold gap-3 mt-4 sm:mt-0 sm:w-[60%] justify-center">
                <p>{item.title}</p>
                <p>-</p>
                <p>£{item.price.toFixed(2)}</p>
              </div>

              <div className="sm:w-[20%]">
                <div className="flex gap-4 items-center justify-center mt-4 sm:mt-0 sm:justify-end">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    disabled={item.quantity <= 1}
                    className={item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <p>{item.quantity}</p>
                  <button onClick={() => addToCart(item)}>
                    <FontAwesomeIcon icon={faPlus}/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={clearCart}
              className="flex items-center bg-[#4B8E10] text-white px-4 py-2 rounded-lg hover:px-8 duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" /> Remove All Items
            </button>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-6 rounded-2xl mt-16 border-2 border-[#C2B66C] text-white">
          <div className="flex justify-between font-bold text-xl">
            <p>Total</p>
            <p>£{totalAmount.toFixed(2)}</p>
          </div>
          <p className="py-2">Tax $0.00</p>
          <div className="flex justify-between">
            <p>Platform Fee</p>
            <p>£0.90</p>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 mt-8">
          <Link to="/Menu" className="sm:w-[auto] w-[200px] bg-[#4B8E10] text-white px-4 hover:px-8 duration-300 ease-in-out py-2 rounded-md"><FontAwesomeIcon icon={faArrowLeft} className="text-sm"/> Continue Shopping</Link>
          <button
            onClick={() => setModalOpen(true)}
            className="sm:w-[auto] w-[200px] team rounded-md hover:px-8 duration-300 ease-in-out font-bold px-4 py-2 flex gap-2 items-center">
            Checkout <FontAwesomeIcon icon={faArrowRight} />
            <span className="ml-auto">£{totalWithFee}</span>
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-[9999999]">
          <div className="bg-black border border-[#A19545] p-6 rounded-lg w-[90%] max-w-lg relative">
            <h4 className="text-lg sm:text-2xl font-semibold text-white mb-4 pt-6">
              Choose Payment Method
            </h4>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 px-3 py-1 rounded-md team brightness-90 hover:brightness-100 duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="sm:flex-nowrap flex flex-wrap gap-4">
              <button
                onClick={() => handleCheckout("cash")}
                className="w-full team rounded-md p-3 brightness-90 hover:brightness-100 duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faCashRegister} /> Cash on Delivery
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "cash" && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-[9999999]">
          <div className="border border-[#A19545] p-6 rounded-lg bg-black w-[90%] max-w-lg relative">
            <h4 className="text-2xl font-semibold mb-4 text-white">Cash on Delivery</h4>
            <button
              onClick={() => setPaymentMethod("")}
              className="absolute top-2 right-2 px-3 py-1 rounded-md team brightness-90 hover:brightness-100 duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <p className="text-white">
              Please enter your name and address for Cash on Delivery.
            </p>
            <form className="mt-4" onSubmit={confirmOrder}>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="team shadow w-full rounded-md p-3 outline-none shadow-cyan-black/50 my-2 pay-input"
              />
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Delivery Address"
                className="team shadow w-full rounded-md p-3 outline-none shadow-cyan-black/50 my-2 pay-input"
              />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="team shadow w-full rounded-md p-3 outline-none shadow-cyan-black/50 my-2 pay-input"
              />
              <input
                required
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="team shadow w-full rounded-md p-3 outline-none shadow-cyan-black/50 my-2 pay-input"
              />

{/* <button
  type="button"
  onClick={() => {
    toast.info("This ordering system is under construction. Please contact the AfroCombo team directly.");
  }}
  className="team ml-auto flex mt-4 py-2 px-3 rounded-lg hover:px-6 duration-300 ease-in-out"
>
  Confirm Order
</button> */}

              <button
                type="submit" 
                className="team ml-auto flex mt-4 py-2 px-3 rounded-lg hover:px-6 duration-300 ease-in-out"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-[99999999]">
          <div className="border border-[#A19545] p-6 rounded-lg bg-black w-[90%] max-w-lg relative">
            <h4 className="text-2xl font-semibold mb-4 text-white">Order Confirmed</h4>
            <p className="text-white">
              Thank you! Your order has been successfully placed.
            </p>
            <button
              onClick={closeConfirmation}
              className="team ml-auto flex mt-4 py-2 px-3 rounded-lg hover:px-6 duration-300 ease-in-out"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cartorders;