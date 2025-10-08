import React from 'react'
import { Map, APIProvider, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import { useLoader } from '../../Store/MapLoaderStore';
import { useItemStore } from '../../Store/useItemStore';



const mapid = import.meta.env.VITE_GOOGLE_MAP_ID;

const MapOneItem = () => {

  const isLoaded = useLoader()
  const currItem = useItemStore(state => state.currItem)

  const center = {
    lat: currItem.address.lat,
    lng: currItem.address.lng,
  }
  

  return isLoaded && (
    <APIProvider>
      <Map
        className="w-full h-[500px] rounded-2xl overflow-hidden"
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
        <AdvancedMarker position={center}>
          <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={'#000'} scale={1.5}/>
        </AdvancedMarker>
      </Map>

    </APIProvider>
  )
}

export default MapOneItem