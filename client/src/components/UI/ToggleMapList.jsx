import React from 'react'
import { MapPinned, List } from 'lucide-react';
import { useMapDataStore } from '../../Store/useMapDataStore';

const ToggleMapList = () => {

  const showMap = useMapDataStore(state => state.showMap)
  const toggleShowMap = useMapDataStore(state => state.toggleShowMap)

  return (
    <div
      onClick={() => toggleShowMap()}
      className="w-36 h-12 bg-teal-600 z-10 fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center cursor-pointer rounded-2xl transition-transform ease-in-out duration-300 hover:scale-110">
      
      {showMap ? 
        <div className="justify-between flex items-center">
          <List className='text-white'/>
          <span className="ml-2 text-white font-semibold">Show List</span>
        </div>
        :
        <div className="justify-between flex items-center">
          <MapPinned className='text-white'/>
          <span className="ml-2 text-white font-semibold">Show Map</span>
        </div>
      }
    </div>

  )
}

export default ToggleMapList
