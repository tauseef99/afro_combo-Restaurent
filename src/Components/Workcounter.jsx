import React, { useState, useEffect, useRef } from "react";

// Array to store the counter data
const counterData = [
  { value: 40, suffix: "+", label: "VISITORS DAILY" },
  { value: 150, suffix: "+", label: "DELIVERIES MONTHLY" },
  { value: 100, suffix: "%", label: "POSITIVE FEEDBACK" },
  { value: 99, suffix: "%", label: "HAPPY CLIENTS" },
];

function Workcounter() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counterValues, setCounterValues] = useState(
    counterData.map(() => 0) // Initial values are set to 0 for the counter
  );

  const counterRef = useRef(null);

  // Function to animate the counters
  const animateCounters = () => {
    const duration = 2000; // Animation duration in ms
    counterData.forEach((data, index) => {
      const startValue = 0;
      const endValue = data.value;
      const increment = (endValue - startValue) / (duration / 16); // Approximation for 60fps

      let currentValue = startValue;
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
          currentValue = endValue;
          clearInterval(interval);
        }
        setCounterValues((prev) => {
          const updatedValues = [...prev];
          updatedValues[index] = Math.floor(currentValue);
          return updatedValues;
        });
      }, 16);
    });
  };

  // Using IntersectionObserver to detect when the section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true); // Ensure counters run only once
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={counterRef} className="text-center work-counter p-[7%] mt-4">
      <div className=" grid sm:grid-cols-2 lg:grid-cols-4 justify-center items-center container mx-auto">
        {counterData.map((data, index) => (
          <div
            key={index}
            className="border-t w-[max-content] mx-auto border-b py-8 border-dashed"
          >
            <p className="text-5xl header-heading pb-2">
              {counterValues[index]} {data.suffix}
            </p>
            <p>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workcounter;
