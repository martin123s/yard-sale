import React from 'react'
import pic404 from '../assets/images/pic404.jpg'
import { SearchX } from 'lucide-react';
import Logo from '../components/UI/Logo';
import { NavLink } from 'react-router';
import Footer from '../components/Layout/Footer';

const Page404 = () => {
  return (
    <>
      <div className="w-full h-screen px-[5%]">
        {/* logo here */}
        <div className="flex flex-row justify-between items-center pt-3">
          <Logo />
        </div>

        <div className="flex flex-row">
          <div className="flex justify-end w-1/2">
            {/* "http://www.freepik.com" */}
            <img src={pic404} alt="404 page animation"/>
          </div>

          <div className="w-1/2 flex flex-col mt-28">
            <div className="flex justify-center text-6xl text-teal-700 font-light border-b border-b-teal-500 pb-1">PAGE NOT FOUND</div>
            <div className="h-48 flex justify-center items-center my-5">
              <SearchX size={85} className="text-teal-700" />
            </div>
            <NavLink to='/'>
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center h-14 w-40 cursor-pointer bg-teal-700 rounded-3xl text-white scale-125 shadow-2xl hover:bg-blue-600 hover:shadow-blue-400 hover:shadow-2xl">
                  GO BACK HOME
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        
      </div>

      <Footer/>
    </>
  )
}

export default Page404