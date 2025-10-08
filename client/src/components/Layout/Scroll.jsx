import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Sofa, Amphora, Shirt, Shovel, PawPrint, Bike, Atom, BookA, Boxes
} from "lucide-react";
import { useItemStore } from "../../Store/useItemStore";
  



const Scroll = () => {

  const goods = ["Furniture", "Home Décor", "Clothing", "Garden & Tools", "Pet Supplies", "Sports & Fitness", "Electronics", "Miscellaneous"];
  const icons = ["Sofa", "Amphora", "Shirt", "Shovel", "PawPrint", "Bike", "Atom", "BookA", "Boxes"];
  const objIcons = { Sofa, Amphora, Shirt, Shovel, PawPrint, Bike, Atom, BookA, Boxes };


  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const pickedItem = useItemStore(state => state.pickedItem)
  const updatePickedItem = useItemStore(state => state.updatePickedItem)


  useEffect(() => {
    checkScroll();
  }, [])

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Introduce a tolerance buffer (5px) to account for snap-back effects
      const tolerance = 15;
      
      setShowLeft(scrollLeft > tolerance);
      setShowRight(Math.round(scrollLeft + clientWidth) < Math.round(scrollWidth) - tolerance);
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  const handleItemClick = (goodsItem) => {
    if (pickedItem === goodsItem) {
      updatePickedItem(null)
    } else {
      updatePickedItem(goodsItem)
    }
  }

  return (
    <div className={`relative w-[95%] h-full pt-2`}>
      {showLeft && (
        <ChevronLeft
          size={30}
          className="absolute left-0 inset-y-1/2 transform -translate-y-1/2 border border-gray-300 rounded-full cursor-pointer bg-white text-teal-700 z-10 p-1 shadow-xl shadow-gray-600 hover:scale-110 hover:border-gray-400"
          onClick={() => handleScroll(-1)}
        />
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto px-3 snap-x scrollbar-hide scroll-smooth"
      >
        <div className="flex w-max gap-10 snap-start">
          {goods.map((item, idx) => {
            const Icon = objIcons[icons[idx]];
            return (
              <div className="cursor-pointer group" key={idx}>
                <div onClick={() => handleItemClick(item)}
                  className={`relative h-full flex flex-col justify-center items-center cursor-pointer space-y-1`}>
                  <Icon size={22} className={`group-hover:text-teal-800 group-hover:fill-gray-200 ${pickedItem === item && 'text-teal-800 fill-gray-300'}`} />
                  <div className={`relative group-hover:text-teal-800 text-sm`}>
                    <div className={`mb-0.5 ${pickedItem === item && 'text-teal-800'}`}>{item}</div>
                    <span className={`absolute bottom-0 left-0 right-0 origin-left bg-teal-600 h-0.5 rounded-full transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 ${pickedItem === item && 'scale-x-100'}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showRight && (
        <ChevronRight
          size={30}
          className="absolute right-0 inset-y-1/2 transform -translate-y-1/2 border border-gray-300 rounded-full cursor-pointer bg-white text-teal-700 z-10 p-1 shadow-xl shadow-gray-600 hover:scale-110 hover:border-gray-400"
          onClick={() => handleScroll(1)}
        />
      )}
    </div>
  );
};

export default Scroll;
