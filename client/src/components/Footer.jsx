import React from 'react'
import { MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router';


const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-row h-14 justify-center mt-10 bg-gray-100 px-[5%]">
      <p className="flex items-center justify-center py-3">© Copyright {new Date().getFullYear()}, Local Yard Sale At Your State Business Company, Portland, ME</p>
      <div className="ml-14 flex justify-center items-center cursor-pointer relative">
        <span
          onClick={() => navigate('/about')}
          className="pr-1 text-teal-700">About us</span>
        <MoveUpRight size={12} />
        <span className="w-full h-0.25 bg-teal-700 rounded-full absolute bottom-3 left-0 right-0"></span>
      </div>

      <div className="ml-7 flex justify-center items-center cursor-pointer relative">
        <span
          onClick={() => navigate('/contact')}
          className="pr-1 text-teal-700">Contact us</span>
        <MoveUpRight size={12} />
        <span className="w-full h-0.25 bg-teal-700 rounded-full absolute bottom-3 left-0 right-0"></span>
      </div>
    </div>
  )
}

export default Footer