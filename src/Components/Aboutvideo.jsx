import React from "react";
import Video1 from "../Assets/videos/About-Video1.mp4";
import Video2 from "../Assets/videos/About-Video2.mp4";
import Video3 from "../Assets/videos/About-Video3.mp4";
import Video4 from "../Assets/videos/About-Video4.mp4";
import Video5 from "../Assets/videos/About-Video5.mp4";
import Video6 from "../Assets/videos/About-Video6.mp4";
import Video7 from "../Assets/videos/About-Video7.mp4";
import Video8 from "../Assets/videos/About-Video8.mp4";
import Video9 from "../Assets/videos/About-Video9.mp4";
import Video10 from "../Assets/videos/About-Video10.mp4";
import Video11 from "../Assets/videos/About-Video11.mp4";
import Video12 from "../Assets/videos/About-Video12.mp4";
function Aboutvideo() {
  return (
    <div>
      <div className="p-4 mt-16 Aboutvideo-bg p-[7%]">
        <div className="grid sm:grid-cols-3 gap-8 container mx-auto">
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-down"
          >
            <source src={Video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video3} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video5} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video6} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video7} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video8} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video9} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video10} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video11} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            controls
            className="rounded-md border-4 border-[white]"
            data-aos="zoom-out-up"
          >
            <source src={Video12} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default Aboutvideo;
