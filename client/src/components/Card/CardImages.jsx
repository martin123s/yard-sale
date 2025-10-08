import React, { useState } from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";


const CardImages = ({children: slides, round}) => {


  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [curr, setCurr] = useState(0);

  const handleLeftMove = (e) => {
    e.stopPropagation()
    setCurr((prev) => {
      const newCurr = prev - 1;
      setShowRightArrow(true);
      setShowLeftArrow(newCurr > 0);
      return Math.max(newCurr, 0);
    });
  };

  const handleRightMove = (e) => {
    e.stopPropagation()
    setCurr((prev) => {
      const newCurr = prev + 1;
      setShowLeftArrow(true);
      setShowRightArrow(newCurr < slides.length - 1);
      return Math.min(newCurr, slides.length - 1);
    });
  };


  return (
    
    <div className={`overflow-hidden relative w-full ${round}`}>
      <div className="flex transition-transform ease-out duration-700 w-full" style={{ transform: `translateX(-${curr * 100}%)` }}>{slides}</div>
      
      {showLeftArrow && (
        <ChevronLeft size={28} onClick={handleLeftMove} className="absolute left-0 inset-y-1/2 transform -translate-y-1/2 border rounded-full bg-white text-black p-0.25 ml-1 opacity-0 group-hover:opacity-100 cursor-pointer"/>
        )}

      {showRightArrow && (
        <ChevronRight size={28} onClick={handleRightMove} className="absolute right-0 inset-y-1/2 transform -translate-y-1/2 border rounded-full bg-white text-black p-0.25 mr-1 opacity-0 group-hover:opacity-100 cursor-pointer" />
      )}

      <div className="absolute bottom-3 right-0 left-0">
        <div className="flex justify-center items-center gap-1 ">
        {slides.map((_, idx) => (
          <div key={idx} className={`tansition-all w-1.5 h-1.5 bg-white rounded-full ${curr === idx ? "p-0.5" : "bg-opacity-60"}`}></div>))}
        </div>
      </div>

    </div>
  )
}

export default CardImages