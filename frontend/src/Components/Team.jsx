import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Team1 from "../Assets/images/obi.jpeg";
import Team2 from "../Assets/images/vicky.jpeg"; // Import other team images
import Team3 from "../Assets/images/team3.jpg"; // Import other team images

// Define an array of team members
const teamMembers = [
  {
    id: 1,
    name: "Obi",
    role: "Head Chef & Managing Director",
    description:
      "Dedicated head of Digi Bite Combo and Hardworker and Effective",
    image: Team1,
  },
  {
    id: 2,
    name: "Vicky",
    role: "Manager",
    description:
      "Dedicated to crafting delicious desserts and pastries that ",
    image: Team2,
  },
  {
    id: 3,
    name: "David",
    role: "Manager",
    description:
      "Productive and Effecttove Team Member play cruel role for the",
    image: Team3,
  },
  // Add more team members as needed
];

function Team() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once or every time you scroll
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className="py-[3%] px-[7%] mx-auto text-center mt-16">
      <hr className="w-[40px] border-none h-[2px] bg-[#4B8E10] mx-auto mb-2" />
      <p className="font-semibold pb-3 text-[#B3A64D]">TEAM</p>
      <h3 className="text-3xl sm:text-5xl header-heading py-4 text-white">
        They Are Ready to Treat You
      </h3>
      <p className="my-4 lg:w-[50%] mx-auto text-white">
        Meet our passionate restaurant team, committed to delivering exceptional
        service and delicious culinary experiences for every guest.
      </p>

      <div className="grid sm:grid-cols-2 lg:flex gap-8 mx-auto container mt-16">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-xl transition-transform duration-300 ease-in-out transform overflow-hidden team cursor-pointer"
          >
            <img
              src={member.image}
              alt={member.name}
              className="transition-transform shadow-lg shadow-cyan-black/100 duration-300 w-[150px] object-cover border-2 border-[white] relative top-12 h-[150px] mx-auto rounded-full ease-in-out transform cursor-pointer brightness-75"
            />
            <div className="p-[5%] team pt-28 rounded-2xl border-t-2 border-[black]">
              <h4 className="text-3xl font-bold" data-aos="zoom-out-down">
                {member.name}
              </h4>
              <p className="py-1" data-aos="zoom-out-down">
                {member.role}
              </p>
              <p className="pt-10 w-[80%] mx-auto" data-aos="zoom-out-down">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
