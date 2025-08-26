import React, { useState, useEffect, useCallback } from 'react'
import { X, SquareCheckBig, CloudUpload } from 'lucide-react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import SearchBar from './SearchBar';
import { usePostStore } from '../Store/usePostStore';
import { useItemStore } from '../Store/useItemStore';
import {useDropzone} from 'react-dropzone'


const Post = ({setPost}) => {

  const prices = ["All Free", "Some Free", "None Free"];
  const goods = ["Furniture", "Home Décor", "Clothing", "Garden & Tools", "Pet Supplies", "Sports & Fitness", "Electronics", "Miscellaneous"];
  const conditions = ["Like new", "Gently used", "Good condition", "Needs some TLC"];

  const { progress, error, sendPost, clearProgress } = usePostStore()
  const updatePostChanges = useItemStore(state => state.updatePostChanges)

  const [newPost, setNewPost] = useState({
    category:"",
    title: "",
    description: "",
    address: {},
    startDate: "",
    price: "",
    types: [],
    conditions: [],
    images:[]
  });
  const [msg, setMsg] = useState(null) 


  const handleSubmit = async () => {

    // Frontend validation
    if (!newPost.category) {
      setMsg("Please select Yard sale or Free pickup category.")
      return
    }
    if (!newPost.title || newPost.title.trim().length < 3) {
      setMsg("Title must be at least 3 characters.")
      return
    }
    if (!newPost.description || newPost.description.trim().length < 5) {
      setMsg("Description must be at least 5 characters.")
      return
    }
    if (!newPost.address) {
      setMsg("Address is required.")
      return
    }
    if (!newPost.startDate) {
      setMsg("Start date is required.")
      return
    }
    if (!newPost.price) {
      setMsg("Price is required.")
      return
    }
    if (newPost.types.length === 0) {
      setMsg("Please select one or more types of goods.")
      return
    }
    if (newPost.conditions.length === 0) {
      setMsg("Please select one or more conditions of goods.")
      return
    }
    if (newPost.images.length === 0 || newPost.images.length > 20) {
      setMsg("Please upload at least 1 image or no more than 20 images.")
      return
    }

    const fd = new FormData()
    fd.append('category', newPost.category)
    fd.append('title', newPost.title)
    fd.append('description', newPost.description)
    fd.append('address', JSON.stringify(newPost.address));
    fd.append('startDate', newPost.startDate)
    fd.append('price', newPost.price)

    newPost.types.forEach((type) => {
      fd.append('types', type)
    })
    newPost.conditions.forEach((condition) => {
      fd.append('conditions', condition)
    })
    newPost.images.forEach((img) => {
      fd.append('images', img)
    })

    try {
      await sendPost(fd)
      setMsg("Post successful")
      updatePostChanges()
    } catch (err) {
      setMsg(`Posting failed...\n ${error}`)
    }
  }

  useEffect(() => {
    if (!msg) return
    const timer = setTimeout(() => {
      clearProgress()
      setMsg(null)
      clearPost()
    }, 6000)

    return () => clearTimeout(timer)
  }, [msg])
  

  const clearPost = () => {
    setNewPost({ category: "", title: "", description: "", address: {}, startDate: "", price: "", types: [], conditions: [], images: [] })
  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setNewPost((pre) => ({
      ...pre,
      images: Array.from(acceptedFiles)
    }))

  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
    multiple: true,
  })

  return (
    <div
      className="fixed inset-0 bg-opacity-60 bg-gray-950 flex justify-center items-center z-50">

      <div
        className="bg-white shadow-2xl w-[40%] h-[98vh] flex flex-col rounded-xl"
        onClick={(e) => e.stopPropagation()} >
        
        {/* Fixed Header */}
        <div className="flex h-20 justify-between items-center border-b px-12 bg-white sticky top-0 rounded-t-xl mb-3">
          <span className="text-xl font-semibold rounded-lg border-2 border-gray-300 p-2 shadow-xl">New Post</span>
          <X size={35} onClick={() => setPost(false)} className="cursor-pointer hover:bg-gray-100 rounded-full w-12" />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-12 py-3">

          {/* category and title */}
          <div className="flex flex-row justify-between items-center border border-teal-600 h-28 shadow-xl mt-5 rounded-lg">

            <div className="w-2/5 flex flex-col justify-start flex-1 ml-2">
              {/* Yard Sale */}
              <div onClick={() => setNewPost(pre => ({ ...pre, category: pre.category === "Yard Sale" ? "" : "Yard Sale" }))}
                className={`relative border-2 rounded-lg cursor-pointer p-2 w-[90%] mb-2 hover:bg-gray-200 ${
                  newPost.category === "Yard Sale" && "border-red-500 bg-gray-200"}`}>
                <SquareCheckBig className={`absolute left-3 transition-colors ${newPost.category === "Yard Sale" ? "text-teal-500" : "text-gray-500"}`}/>
                <span className={`ml-10 font-semibold ${newPost.category === "Yard Sale" && "text-teal-700"}`}>
                  Yard Sale
                </span>
              </div>

              {/* Free Pickup */}
              <div onClick={() => setNewPost(pre => ({ ...pre, category: pre.category === "Free Pickup" ? "" : "Free Pickup" }))}
                className={`relative border-2 rounded-lg cursor-pointer p-2 w-[90%] hover:bg-gray-200 ${
                  newPost.category === "Free Pickup" && "border-red-500 bg-gray-200"}`} >
                <SquareCheckBig className={`absolute left-3 transition-colors ${
                    newPost.category === "Free Pickup" ? "text-teal-500" : "text-gray-500"}`}/>
                <span className={`ml-10 font-semibold ${newPost.category === "Free Pickup" && "text-teal-700"}`}>
                  Free Pickup
                </span>
              </div>
            </div>

            {/* title */}
            <div className="w-3/5 flex flex-row justify-start">
              <span className="font-semibold mr-1 pt-1">Title:</span>
              <textarea value={newPost.title}
                onChange={(e) => {
                  const value = e.target.value
                  setNewPost(pre => ({ ...pre, title: value.length > 60 ? value.slice(0, 60) + "..." : value }))
                }}
                className="border-2 border-gray-200 w-full h-24 rounded-lg p-1 mr-2 resize-y outline-none focus:border-teal-600" placeholder="Limited in 20 words..."></textarea>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col justify-start mt-10">
            <span className="font-semibold text-lg pb-1">Description:</span>
            <div className="h-28 border border-teal-700 rounded-lg">
              <textarea value={newPost.description}
                onChange={(e) => {
                  const value = e.target.value
                  setNewPost(pre => ({ ...pre, description: value.length > 300 ? value.slice(0, 300) + "..." : value }))
                }}
                className="w-full h-full rounded-lg p-1 resize-y outline-none leading-relaxed" placeholder="Limited in 100 words...">
              </textarea>
            </div>
          </div>

          {/* address */}
          <div className="flex flex-col justify-start mt-10">
            <span className="font-semibold text-lg pb-1">Address:</span>
            <div className="w-[98%]">
              <SearchBar
                value={newPost.address?.address || ""}
                onChange={(e) => setNewPost(pre => ({
                  ...pre,
                  address: { ...pre.address, address: e.target.value }
                }))}
                setValue={(value) => setNewPost((pre) => ({
                  ...pre,
                  address: value
                }))}
                placeholder="Enter an address for holding Yard Sale or Free Pickup"
                className="border-b-2 border-b-teal-700"
                maxLength={100}
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col justify-start mt-10">
            <span className="font-semibold text-lg pb-1">Select Date:</span>
            <Calendar onChange={(date) => setNewPost(pre => ({ ...pre, startDate: date.toDateString()}))} value={newPost.startDate} className="mx-[11%] mt-2" />
            
            <div className="my-2 flex justify-center items-center">
              <span className="mr-2">Selected Date:</span>
              <span className="text-red-600 font-semibold text-lg">{newPost.startDate ? newPost.startDate: "Not Selected"}</span>
            </div>
          </div>

          {/* prices */}
          <div className="border-b my-7 h-28 flex flex-col justify-start">
            <span className="mb-2 font-semibold text-lg pb-1">Price range</span>
            <div className="border-2 border-teal-700 h-14 rounded-xl flex flex-row justify-between items-center px-1 font-light">
              {prices.map((item, idx) => (
                <div key={idx}
                  onClick={() => setNewPost(pre => ({ ...pre, price: pre.price === item ? "": item}))}
                  className={`border hover:bg-gray-200 w-[33%] h-[90%] flex justify-center items-center rounded-lg cursor-pointer text-teal-900 ${newPost.price === item ? "border-2 border-red-600 bg-gray-200 font-semibold" : "border-teal-700"}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* goods */}
          <div className="border-b my-7">
            <span className="font-semibold text-lg">Types of goods</span>
            <div className="flex flex-wrap gap-5 mt-5 pb-5">
              {goods.map((item, idx) => (
                <div key={idx}
                  onClick={() => setNewPost(pre => ({
                    ...pre,
                    types: pre.types.includes(item)? pre.types.filter(p => p !== item) : [...pre.types, item],
                  }))}
                  className={`border rounded-lg flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 ${newPost.types.includes(item) ? "border-2 border-red-600 bg-gray-200 font-semibold" : "border-teal-600"}`}>
                  <span className=" text-teal-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* conditions */}
          <div className="border-b mb-7">
            <span className="font-semibold text-lg">Conditions of goods</span>
            <div className="flex flex-wrap gap-5 my-3 pb-3">
              {conditions.map((item, idx) => (
                <div key={idx}
                  onClick={() => setNewPost(pre => ({
                    ...pre,
                    conditions: pre.conditions.includes(item)? pre.conditions.filter(p => p !== item) : [...pre.conditions, item],
                  }))}
                  className={`border rounded-lg flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 ${newPost.conditions.includes(item) ? "border-2 border-red-600 bg-gray-200 font-semibold":"border-teal-600"}`}>
                  <span className=" text-teal-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* image upload */}
          <span className="font-semibold text-lg">Upload images [Limited 20 images]</span>
          <div 
            {...getRootProps()}
            className="relative border-2 border-dashed h-36 w-[98%] border-teal-700 rounded-lg cursor-pointer bg-blue-50 flex flex-col items-center justify-center mt-3 mb-8">
            <CloudUpload size={40} className="mb-1" />

            {/* ✅ Show image count if any selected */}
            {isDragActive ?
              <span className="border-b border-b-blue-600 text-blue-600 mb-1">Drop the images here</span>
               :
              newPost.images.length > 0 ? (
              <span className="text-lg text-teal-700 font-semibold border-b border-b-black mb-2">
                {newPost.images.length} file{newPost.images.length > 1 ? 's' : ''} selected
              </span>
            ) :
              <span className="text-center pb-1">
                <span className="border-b-2 border-b-blue-600 text-blue-600">Click to upload</span> or drag & drop
              </span>
            }
            <span className="text-xs text-red-700">Each Image MUST LESS than 10 MB</span>

            <input
              {...getInputProps()}
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*,video/*"
              multiple
            />
          </div>

          {progress > 0 && <progress max="100" className="w-full" value={progress}></progress>}
          {msg ? <span className="text-lg text-red-600" style={{ whiteSpace: 'pre-line' }}>{msg}</span> : <div className="w-full h-8 bg-white" style={{ whiteSpace: 'pre-line' }}></div>
          }
          <div className="mb-6 w-full"></div>
        </div>

        {/* Fixed bottom */}
        <div className="flex h-20 justify-between items-center px-10 bg-white sticky bottom-0 rounded-b-xl my-2 border-t-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div
            onClick={clearPost}
            className="mt-1 border rounded-lg flex justify-end items-center cursor-pointer bg-red-600 text-white py-2 px-4 hover:shadow-xl hover:shadow-gray-300">
              Clear all
          </div>

          <div
            onClick={handleSubmit}
            className="mt-1 w-24 border border-emerald-600 rounded-lg flex justify-center items-center cursor-pointer text-white bg-emerald-600 py-2 px-4 hover:shadow-xl hover:shadow-gray-300 font-semibold">
              Post
          </div>
        </div>

      </div>
    </div>
  )
}

export default Post