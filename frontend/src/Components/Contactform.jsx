import { React, useEffect,useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function Contactform() {
  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: "ease-in-out" });
  }, []);

  // Form state for controlled inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make a POST request to your backend (Express) endpoint
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send message.... Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="text-center container mx-auto p-[7%]">
        <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2" />
        <p className="font-semibold pb-3 text-[#B3A64D]">Contact form</p>
        <h3 className="text-4xl sm:text-5xl header-heading py-4 text-white">
          Write Us a Message
        </h3>

        <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 mt-10 gap-10">
          <input
            data-aos="zoom-out-up"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="outline-none rounded-md py-2 px-3 team pay-input"
            required
          />
          <input
            data-aos="zoom-out-up"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="outline-none rounded-md py-2 px-3 team pay-input"
            required
          />
          <input
            data-aos="zoom-out-up"
            type="number"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="outline-none rounded-md py-2 px-3 team pay-input"
            required
          />
          <input
            data-aos="zoom-out-up"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none rounded-md py-2 px-3 team pay-input"
            required
          />
        </div>

        <textarea
          className="w-[100%] team pay-input rounded-md h-[250px] mt-10 p-3 outline-none"
          data-aos="zoom-out-up"
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          className="team py-2 px-4 rounded-md hover:px-8 duration-300 ease-in-out mt-10"
        >
          SEND MESSAGE
        </button>
      </form>
      </div>

      <div>
        <iframe
         title="Contact Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.3715180165614!2d-0.9874056000000001!3d52.000107799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876e33353b10e41%3A0xc14be0c8b552cd51!2sAfro%20Combo%20Restaurant!5e0!3m2!1sen!2s!4v1728489790371!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}

export default Contactform;
