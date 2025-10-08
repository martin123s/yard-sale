import React, { useState } from 'react'
import {X} from 'lucide-react';

const Filter = ({setFilter}) => {

  const prices = ["All Free", "Some Free", "None Free"];
  const category = ["Yard Sale", "Free Pickup"];
  const conditions = ["Like new", "Gently used", "Good condition", "Needs some TLC"];
  const times = ["Past 3 days", "Past 5 days", "Coming Soon"];

  const [select, setSelect] = useState(true)


  return (
    <div
      onClick={(e) => { (e.target === e.currentTarget) && setFilter(false)}}
      className="fixed inset-0 bg-opacity-40 bg-gray-950 flex justify-center items-center z-50">

      <div
        className="bg-white shadow-2xl w-[35%] flex flex-col rounded-xl"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Fixed Header */}
        <div className="flex h-20 justify-between items-center border-b px-10 bg-white sticky top-0 z-10 rounded-t-xl">
          {!select ? (
          <>
            <span className="text-xl font-semibold">Filters</span>
            <X size={30} onClick={() => setFilter(false)} className="cursor-pointer hover:bg-gray-100 rounded-full w-12" />
          </>) : (
          <>
            <div
            onClick={() => setSelect(false)}    
            className="h-11 w-24 flex justify-center rounded-lg items-center cursor-pointer bg-pink-700 text-white font-light hover:shadow-xl hover:shadow-red-200">
              Clear all
            </div>
            <div className="border-b border-teal-600 flex justify-center items-center h-11 font-light">Selecting 500 +</div>
            <div className="border h-11 border-black rounded-lg flex justify-end items-center cursor-pointer font-light text-white bg-black px-2 hover:shadow-xl hover:shadow-gray-300">
              Your Selection
            </div>
          </>)}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-10 py-3">

          <div className="border-b mb-3 h-28 flex flex-col justify-start">
            <span className="mb-2 font-semibold text-lg pb-1">Price range</span>
            <div className="border-2 border-teal-700 h-14 rounded-xl flex flex-row justify-between items-center px-1 font-light">
              {prices.map((item, idx) => (
                <div key={idx}
                  className={`border hover:bg-gray-200 w-[33%] h-[90%] flex justify-center items-center rounded-lg cursor-pointer text-teal-900 ${select ? "border-2 border-red-600 bg-gray-200 font-semibold" : "border-teal-700"}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border-b mb-3">
            <span className="font-semibold text-lg">Category</span>
            <div className="flex flex-wrap gap-5 my-3 pb-3">
              {category.map((item, idx) => (
                <div key={idx}
                  className={`border rounded-lg flex justify-between items-cente p-2 cursor-pointer hover:bg-gray-200 ${select ? "border-2 border-red-600 bg-gray-200 font-semibold" : "border-teal-600"}`}>
                  <span className=" text-teal-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-b mb-3">
            <span className="font-semibold text-lg">Conditions of goods</span>
            <div className="flex flex-wrap gap-4 my-3 pb-3">
              {conditions.map((item, idx) => (
                <div key={idx}
                  className={`border rounded-lg flex justify-between items-cente p-2 cursor-pointer hover:bg-gray-200 ${select ? "border-2 border-red-600 bg-gray-200 font-semibold" : "border-teal-600"}`}>
                  <span className=" text-teal-900">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b mb-5">
            <span className="font-semibold text-lg">Date Listed / Upcoming Sales</span>
            <div className="flex flex-wrap gap-4 my-3 pb-3">
              {times.map((item, idx) => (
                <div key={idx}
                  className={`border rounded-lg flex justify-between items-cente p-2 cursor-pointer hover:bg-gray-200 ${select ? "border-2 border-red-600 bg-gray-200 font-semibold" : "border-teal-600"}`}>
                  <span className=" text-teal-900">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Filter