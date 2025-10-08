import React from 'react'
import { NavLink } from 'react-router'

const Logo = () => {
  return (
    <NavLink to='/'>
      <div className="mt-4 flex justify-center items-center h-12 cursor-pointer">
        <span className="pr-1 font-sans text-5xl font-semibold">Yard</span>
        <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-6 before:bg-teal-700 ml-1">
          <span className="relative text-white text-3xl font-bold">Sale</span>
        </span>
      </div>
    </NavLink>
  )
}

export default Logo
