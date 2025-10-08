import React from 'react'
import Card from "./Card"
import { useItemStore } from '../../Store/useItemStore';



const Cards = () => {

  const items = useItemStore((state) => state.items)
  const showItemsNumber = useItemStore(state => state.showItemsNumber)
  const updateShowItemsNumber = useItemStore(state => state.updateShowItemsNumber)
  const pickedItem = useItemStore(state => state.pickedItem)

  const handleShowMoreItems = () => {
    updateShowItemsNumber(Math.min(showItemsNumber + 8, items.length))
  }

  const selectedItems = pickedItem ? items.filter(item => item.types.includes(pickedItem)) : items
  

  return (
    <div className="mx-[5%] mt-40 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
        {selectedItems.slice(0, showItemsNumber).map((item, _) => (
          <Card key={item._id} item={item} slides={item.images} className="h-72 md:h-80" round={"rounded-xl"} />
        ))}
      </div>

      {selectedItems && (showItemsNumber < selectedItems.length ? 
        <button onClick={handleShowMoreItems} className="mt-10 px-6 py-2 border-2 border-indigo-500 text-indigo-500 bg-white rounded-md hover:text-white hover:bg-indigo-500 hover:border-2 hover:border-indigo-500">
          Load More
        </button>
        :
        <p className="mt-10 text-gray-500 text-center text-lg">You've reached the end.</p>
      )}

    </div>
  )
}

export default Cards

