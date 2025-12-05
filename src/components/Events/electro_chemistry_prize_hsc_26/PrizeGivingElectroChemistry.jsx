import React, { useRef, useEffect } from "react";
import prizeGivingData from "./prizeGivingData.json";
// ...existing code...
// Removed external CSS, using Tailwind only

const PrizeGivingElectroChemistry = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let scrollAmount = 0;
    const scrollStep = 1;
    const maxScroll = scrollContainer.scrollWidth / 2;
    scrollContainer.scrollLeft = 0;
    const interval = setInterval(() => {
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 text-center">
      <h2 className="text-2xl font-bold mb-6">Electro Chemistry Chapter Final Exam - Prize Giving</h2>
      <div
        className="flex overflow-x-auto gap-3 pb-4"
        ref={scrollRef}
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Render students twice for infinite scroll */}
        {[...prizeGivingData, ...prizeGivingData].map((student, idx) => (
          <div
            className="relative flex items-center justify-center w-44 h-44 flex-shrink-0"
            key={student.name + idx}
          >
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full bg-black/60 text-white text-sm rounded px-2 py-1 text-center z-10">
              {student.name}
            </div>
            <img
              src={`/prize_giving/${student.image}`}
              alt={student.name}
              className="w-50 h-50 object-cover rounded-xl shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizeGivingElectroChemistry;
