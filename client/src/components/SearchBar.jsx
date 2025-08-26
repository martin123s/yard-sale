import React from 'react'
import { useState, useRef} from 'react';
import { StandaloneSearchBox, Autocomplete } from '@react-google-maps/api'
import {useLoader} from '../Store/MapLoaderStore';
import { Search, X } from 'lucide-react';


const SearchBar = ({ value, onChange, setValue, placeholder, className, ...props }) => {

  const refInput = useRef(null)
  const isLoaded = useLoader()


  const handlePlaceChanged = () => { 
    if (refInput.current) {
      const address = refInput.current.getPlaces()
      if (address && address.length > 0) {
        const place = address[0].formatted_address
        const lat = address[0].geometry.location.lat()
        const lng = address[0].geometry.location.lng()

        setValue?.({
          address: place,
          lat, 
          lng
        })
      }
    }
  }


  return (
    <>
      <div className={`relative w-full flex justify-start items-center h-11 ${className}`}>
        {isLoaded &&
          <div className="w-full">
            <StandaloneSearchBox onLoad={(ref) => refInput.current = ref} onPlacesChanged={handlePlaceChanged}>
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="h-full w-full outline-none pl-2 font-light pb-1"
                {...props }
              />
            </StandaloneSearchBox>
          </div>}
        {value ?
          <X onClick={() => setValue({ address: "", lat: null, lng: null })} className="absolute right-0 mr-3 cursor-pointer" /> :
          <Search className="absolute right-0 mr-3 cursor-pointer" />
        }
      </div>
    </>
  )
}

export default SearchBar