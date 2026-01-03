import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock,faPhone } from "@fortawesome/free-solid-svg-icons";
// changes in book table
function Booktable() {
  const [person, setPerson] = useState("1 Person");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00 PM");
  const [phone, setPhone] = useState(""); // State for phone number

  useEffect(() => {
    const storedPerson = localStorage.getItem("person");
    const storedDate = localStorage.getItem("date");
    const storedTime = localStorage.getItem("time");

    if (storedPerson) setPerson(storedPerson);
    if (storedDate) setDate(storedDate);
    if (storedTime) setTime(storedTime);
  }, []);

  const handlePersonChange = (e) => {
    setPerson(e.target.value);
    localStorage.setItem("person", e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    localStorage.setItem("date", e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    localStorage.setItem("time", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", { person, date, time, phone });

    try {
      const response = await fetch("http://localhost:5000/api/book-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, date, time, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Table booked successfully! Confirmation email sent.");
      } else {
        alert(`Failed to book: ${data.error}`);
      }
    } catch (error) {
      console.error("Error booking table:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-[80%] mx-auto rounded-md bg-[black] border relative lg:top-[70px] top-[50px] border-[white] py-[4%] lg:px-[2%]">
  <form className="gap-4 lg:flex sm:grid-cols-2 sm:px-4 grid items-center justify-center container" onSubmit={handleSubmit}>
    
    <div className="sm:w-[100%] w-[240px] items-center flex cursor-pointer border-2 border-[black] rounded-sm">
      <select value={person} onChange={handlePersonChange} className="w-[100%] pr-2 p-2 outline-none border-r-2 rounded-bl-md rounded-tl-md team">
        {[...Array(6)].map((_, index) => (
          <option key={index} value={`${index + 1} Person`}>
            {index + 1} Person
          </option>
        ))}
      </select>
      <div className="flex items-center border-l-2 border-[black] px-3 text-black team h-[35px] rounded-br-md rounded-tr-md">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>

    <p className="text-white">For</p>

    {/* <div className="w-[100%] items-center flex cursor-pointer border-2 border-[black] rounded-sm"> */}
    <div className="sm:w-[100%] w-[240px] items-center flex cursor-pointer border-2 border-[black] rounded-sm">
      
      <input required type="date" value={date} onChange={handleDateChange} className="w-[100%] h-[35px] pr-2 p-2 outline-none border-r-2 rounded-md team" />
    </div>

    <p className="text-white">At</p>

    <div className="w-[100%] flex items-center cursor-pointer border-2 border-[black] rounded-sm">
      <select value={time} onChange={handleTimeChange} className="w-[70%] pr-2 p-2 outline-none border-r-2 rounded-bl-md rounded-tl-md team">
        {[...Array(10)].map((_, i) => {
          const hour = i + 12;
          return <option key={hour} value={`${hour}:00 PM`}>{`${hour}:00 PM`}</option>;
        })}
        <option value="Sunday" disabled>Sunday: Closed</option>
      </select>
      <div className="flex items-center px-3 text-black team bg-[white] h-[35px] rounded-br-md rounded-tr-md">
        <FontAwesomeIcon icon={faClock} />
      </div>
    </div>

    <p className="text-white">Phone</p>

    <div className="w-[100%] items-center flex cursor-pointer border-2 border-[black] rounded-sm">
      <input
        required
        type="number"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-[100%] h-[35px] pr-2 p-2 outline-none border-r-2 rounded-md team"
      />
      <div className="flex items-center px-3 text-black bg-[white] h-[35px] rounded-br-md rounded-tr-md">
        <FontAwesomeIcon icon={faPhone} />
      </div>
    </div>

    <button className="lg:w-[70%] w-[100%] border border-[white] bg-[#4B8E10] text-white hover:px-8 duration-300 ease-in-out py-[6px] px-4 rounded-md" type="submit">
      Book a table
    </button>
  </form>
</div>

  );
}

export default Booktable;
