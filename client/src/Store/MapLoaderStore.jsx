import { create } from 'zustand'
import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect } from 'react';


const map_api = import.meta.env.VITE_GOOGLE_MAP_API;
const libraries = ['places']

const useMapLoaderStore = create((set) => ({
  isLoaded: false,
  setIsLoaded: (loaded) => set({isLoaded: loaded}),
}))

export const useLoader = () => {
  const { isLoaded, setIsLoaded } = useMapLoaderStore();
  const { isLoaded: loaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: map_api,
    libraries,
  });

  useEffect(() => {
    if (loaded && !isLoaded) {
      setIsLoaded(true);
    }
  }, [loaded])

  return isLoaded;
}

export default useMapLoaderStore;