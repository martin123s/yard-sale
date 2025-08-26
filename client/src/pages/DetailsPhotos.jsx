import React from 'react'
import { useState, useEffect } from 'react';
import {X, Heart, ChevronLeft, Share, ChevronRight} from 'lucide-react';
import { useItemStore } from '../Store/useItemStore';
import { useNavigate } from 'react-router';


const CURR_URL = import.meta.env.VITE_URL

const DetailsPhotos = () => {

  const [share, setShare] = useState(false)
  const { currItem } = useItemStore()
  const navigate = useNavigate()

  useEffect(() => {
    if(!share) return
    const timeoutId = setTimeout(() => {
      setShare(false); // Hide "Link Copied!" after 2 seconds
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [share]); // Runs only when `share` changes

  const handleLink = () => {
    navigator.clipboard.writeText(CURR_URL);
    setShare(true); // Show "Link Copied!"
  };

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [curr, setCurr] = useState(0);
  const [save, setSave] = useState(false);

  const handleLeftMove = () => {
    setCurr((prev) => {
      const newCurr = prev - 1;
      setShowRightArrow(true); 
      setShowLeftArrow(newCurr > 0);
      return Math.max(newCurr, 0);
    });
  };

  const handleRightMove = () => {
    setCurr((prev) => {
      const newCurr = prev + 1;
      setShowLeftArrow(true); 
      setShowRightArrow(newCurr < currItem.images.length - 1); 
      return Math.min(newCurr, currItem.images.length - 1);
    });
  };


  return (
    <>
      <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50">
        <div className="px-[8%] flex flex-col justify-between items-center w-full h-full">

          <div className="flex flex-row justify-between items-center h-28 w-full">
            {/* close button */}
            <div onClick={() => navigate(-1)}
              className=" hover:bg-gray-600 flex justify-between items-center p-2 ml-2 cursor-pointer rounded-lg text-white">
              <X size={20} />
              <span className="ml-1 pb-0.5">close</span>
            </div>

            {/* pics number */}
            <div className="text-white text-lg">Images left: {currItem.images.length - curr}</div>

            <div className="flex justify-between text-white">
              {/* save */}
              <div onClick={() => setSave(pre => !pre)}
                className={`mr-2 rounded-lg h-9 cursor-pointer flex justify-between items-center p-2 ${save ? "bg-gray-600" :"hover:bg-gray-600" }`}>
                <Heart size={20} className={`${save && "fill-red-600 text-red-600"}`} />
                <span className={`ml-1 text-sm ${save && "text-red-600"}`}>Save</span>
              </div>

              {/* share link */}
              <div className="relative">
                <div onClick={handleLink}
                  className={`rounded-lg h-9 cursor-pointer flex justify-between items-center p-2 ${share ? "bg-gray-600" :"hover:bg-gray-600" }`}>
                  <Share size={20} className="text-white" />
                  <span className="ml-1 text-sm text-white">Share</span>
                </div>
                  
                {share && (
                  <div className="absolute bottom-10 inset-x-1 text-xs w-full text-white">
                    Link Copied!
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="w-full h-[90%] flex flex-row justify-between items-center" >

            <div className="w-1/6 h-full flex justify-start items-center">
              {showLeftArrow && (
                <ChevronLeft size={30} onClick={handleLeftMove} className="hover:bg-gray-500 bg-gray-900 cursor-pointer rounded-full w-12 h-12 p-2 text-white border border-gray-400" />
              )}
            </div>
            
            <div className="w-4/6 h-full flex justify-center items-center">
              <div className="w-full h-full overflow-hidden">
                <div className="flex transition-transform ease-in-out duration-700 w-full h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
                  {currItem.images.map((item, i) => (
                    <img key={i} src={`${item.path}`} alt={item.originalName || "image"} className="w-full h-full object-contain flex-shrink-0"/>
                  ))}
                </div>
              </div>
            </div> 

            <div className="w-1/6 h-full flex justify-end items-center">
              {showRightArrow && (
                <ChevronRight size={30} onClick={handleRightMove} className="hover:bg-gray-500 bg-gray-900 cursor-pointer rounded-full w-12 h-12 p-2 text-white border border-gray-400" />
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default DetailsPhotos