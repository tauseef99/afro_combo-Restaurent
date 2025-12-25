// src/Components/Backgroundaudio.js
import React, { useEffect, useRef } from "react";
import backgroundMusic from "../Assets/background-audio/Background-audio.mp3"; // Adjust path if needed

function Backgroundaudio({ isPlaying }) {
  const audioRef = useRef(new Audio(backgroundMusic)); // Create audio instance

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.1; // Set volume
    audio.loop = true;  // Enable looping

    // Handle visibility change (pause when tab is inactive)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
      } else if (isPlaying) {
        audio.play().catch((err) => console.log("Play blocked:", err));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Play or pause based on the isPlaying prop
    if (isPlaying) {
      audio.play().catch((err) => console.log("Play blocked:", err));
    } else {
      audio.pause();
    }

    // Cleanup on unmount
    return () => {
      audio.pause();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]); // Re-run effect when isPlaying changes

  return null; // No visible UI required
}

export default Backgroundaudio;
