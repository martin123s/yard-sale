import React, { useEffect, useRef } from "react";
import CardImages from "./CardImages"
import { X, Heart} from 'lucide-react';
import { useLikesStore } from "../../Store/useLikesStore";
import { useItemStore } from "../../Store/useItemStore";
import { useNavigate } from "react-router";



const Card = ({ item, slides, className, round, setSelected}) => {

  const { updateTime } = useLikesStore()
  const { updateCurrItem } = useItemStore()
  const like = useLikesStore((state) => state.isLiked(item._id))
  const toggleLike = useLikesStore((state) => state.toggleLike)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const time = Date.now()
    updateTime(time) // set the timer to post likes
  }, [like])

  const navigate = useNavigate()

  const handleCardClick = (item) => {
    updateCurrItem(item)
    navigate(`/details/${item._id}`)
  }

  
  return (
    <>
      <div onClick={() => handleCardClick(item)}
        className="w-full cursor-pointer group">
        <div className="relative">
          <CardImages round={round}>
            {slides.map((slide, _) => (
              <img key={slide._id} src={`${slide.path}`} alt={slide.originalName || "image"} className={`${className} object-cover w-full flex-shrink-0`} />
            ))}
          </CardImages> 

          {round === "rounded-xl" ? 
            <div className="absolute top-4 right-4">
              {/* <Save/> */}
              <div onClick={(e) => {
                e.stopPropagation();
                toggleLike(item._id)
              }}
                className="cursor-pointer transition-transform ease-in-out duration-300 hover:scale-110 pb-0.25">
                <Heart size={25}
                  className={`${like ? "fill-red-600 text-red-600" : "fill-gray-950 text-white"}`} />
              </div>
            </div>
            :
            <div className="mt-4 mr-4 absolute right-0 top-0 flex justify-between">
              {/* save show in map model */}
              <div onClick={(e) => {
                e.stopPropagation();
                toggleLike(item._id)
              }}
                className="transition-transform ease-in-out duration-300 rounded-full h-7 w-7 cursor-pointer flex justify-between items-center p-1 bg-gray-200 hover:bg-gray-50 hover:scale-110 pb-0.25">
                <Heart size={19} className={`${like && "fill-red-600 text-red-600"}`} />
              </div>

              {/* close button in map model */}
              <div onClick={(e) => {
                e.stopPropagation()
                setSelected(false)
              }}
                className="transition-transform ease-in-out duration-300 p-1 cursor-pointer bg-gray-200 hover:bg-gray-50 hover:scale-110 rounded-full w-7 h-7 ml-3">
                <X size={18} className="mt-0.25 ml-0.25" />
              </div>
              
            </div>
          }
          
        </div>
        
        {/* Content Section */}
        <div className="mt-2 font-light justify-start flex flex-col">

          <div className="flex items-center mt-1 ml-1">
            <span className="truncate font-semibold">{item.address.address}</span>
          </div>
            
          <span className="font-light my-1 text-sm ml-1">
            {item.startDate}
          </span>

          <span className="font-light text-sm ml-1">{item.category}</span>

        </div>
      </div>
    </>
  )
}

export default Card