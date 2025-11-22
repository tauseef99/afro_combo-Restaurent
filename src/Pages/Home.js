import React from "react";
import Header from "../Components/Header";
import Homesec2 from "../Components/Homesec2";
import Workcounter from "../Components/Workcounter";
import Chooseus from "../Components/Chooseus";
import Reservation from "../Components/Reservation";
import Footer from "../Components/Footer";
import Testimonial from "../Components/Testimonial";
import Homegallery from "../Components/Homegallery";

function Home() {
  return (
    <div>
      <Header />
      <Homesec2 />
      <Homegallery />
      <Chooseus />
      <Workcounter />
      <Testimonial />
      <Reservation />
      <Footer />
    </div>
  );
}

export default Home;
