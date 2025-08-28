import React from 'react'
import { useState, useCallback, useEffect} from 'react';
import { Map, APIProvider, AdvancedMarker, Pin, InfoWindow, useMap} from '@vis.gl/react-google-maps';
import { useLoader } from '../Store/MapLoaderStore';
import "./MapManyItems.css"
import { useItemStore } from '../Store/useItemStore';
import { useMapDataStore } from '../Store/useMapDataStore';
import Card from "./Card"


const mapid = import.meta.env.VITE_GOOGLE_MAP_ID;


const MapManyItems = () => {

  const isLoaded = useLoader()
  
  const center = useMapDataStore(state => state.center)
  const [selected, setSelected] = useState(null);

  const items = useItemStore((state) => state.items)
  const pickedItem = useItemStore(state => state.pickedItem)
  const selectedItems = pickedItem ? items.filter(item => item.types.includes(pickedItem)) : items



  return isLoaded && (
    <APIProvider>
      <Map
        key={JSON.stringify(center)} 
        className="w-full h-screen rounded-2xl overflow-hidden"
        defaultZoom={13}
        defaultCenter={center}
        options={{
          mapId: mapid,
          gestureHandling: "auto",
          zoomControl: true, // Show + and -
          scrollwheel: false,
          disableDefaultUI: true, // Remove everything else
        }}
      >
        {selectedItems.map((item, idx) => (
          <div key={idx}>
            <AdvancedMarker position={{ lat: item.address.lat, lng: item.address.lng }} onClick={() => setSelected(pre => pre?._id === item._id ? null : item)}>
              <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={'#000'} scale={1.5} />
            </AdvancedMarker>

            {selected?._id === item._id && (
              <InfoWindow
                position={{ lat: item.address.lat, lng: item.address.lng }}
                onCloseClick={() => setSelected(null) }
                options={{
                  pixelOffset: new google.maps.Size(0, -42), // Moves the InfoWindow up 40px
                  headerDisabled: true
                }}
              >
                <div className="relative w-80 rounded-2xl bg-white pb-2 shadow-lg">
                  <Card item={item} slides={item.images} className="h-56" round={"rounded-t-xl"} setSelected={ setSelected } />
                  <div className="absolute -bottom-3 left-36 bg-white h-6 w-6 rotate-45"></div>
                </div>
              </InfoWindow>
            )}
          </div>
        ))}

      </Map>

    </APIProvider>
  )
}

export default MapManyItems