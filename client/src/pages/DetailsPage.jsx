import React from 'react'
import {Heart, ChevronLeft, Share, CircleSlash2, Grip, Star, Handshake, ShoppingBag, HandCoins, Gem, ShoppingCart, Tag, Home, Search, Truck, Clock, Boxes} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import comingsoon from "../assets/images/comingsoon.jpg"

import Footer from '../components/Footer';
import MapOneItem from '../components/MapOneItem';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useLikesStore } from "../Store/useLikesStore";
import { useItemStore } from '../Store/useItemStore';
import { useUserStore } from '../Store/useUserStore';


const CURR_URL = import.meta.env.VITE_URL


const DetailsPage = () => {


  const slogans = [
    { text: "One Yard, Tons of Deals!", icon: <ShoppingBag/> },
    { text: "Everything Must Go—Don’t Miss Out!", icon: <HandCoins /> },
    { text: "Hidden Treasures, Low Prices!", icon: <Gem /> },
    { text: "Shop Big, Spend Little!", icon: <ShoppingCart /> },
    { text: "Clear Out Sale – Steals & Deals!", icon: <Tag /> },
    { text: "From Our Home to Yours – Great Finds!", icon: <Home /> },
    { text: "Bargains Galore—Come Explore!", icon: <Search /> },
    { text: "Bigger Sale, Bigger Savings!", icon: <Truck /> },
    { text: "Shop Early, Score Big!", icon: <Clock /> },
    { text: "Decluttering Our Home, Filling Yours!", icon: <Boxes /> }
  ]

  const [share, setShare] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const user = useUserStore(state => state.user)

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when route changes
  }, [pathname]);

  // handle link show 2 seconds
  useEffect(() => {
    let timeoutId;
    if (share) {
      timeoutId = setTimeout(() => {
        setShare(false); // Hide "Link Copied!" after 2 seconds
      }, 2000);
    }
    
    return () => clearTimeout(timeoutId);
  }, [share]); // Runs only when `share` changes

  const handleLink = () => {
    navigator.clipboard.writeText(CURR_URL);
    setShare(true); // Show "Link Copied!"
  };

  // slogan changes when render page
  const [rdSlogans, setRdSlogans] = useState([]);
  useEffect(() => {
    const getRdItems = () => {
      let randomList = [...slogans].sort(() => 0.5 - Math.random());
      return randomList.slice(0, 3); 
    };

    setRdSlogans(getRdItems());
  }, []);




  const navigate = useNavigate();
  const { id } = useParams()

  const updateTime = useLikesStore(state => state.updateTime)
  const currItem = useItemStore(state => state.currItem)
  const like = useLikesStore((state) => state.isLiked(id))
  const toggleLike = useLikesStore((state) => state.toggleLike)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const time = Date.now()
    updateTime(time) // set the timer to post likes
  }, [like])

  const handleImagesClick = () => {
    navigate(`/detailsphotos/${id}`)
  }


  return (
    <>
      {/* fix head */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center h-20 px-[13%] shadow-sm bg-white z-20">

        <div className="w-1/2 flex flex-row justify-between items-center">
          <div onClick={() => navigate(-1)} className="">
            <ChevronLeft size={30} className="hover:bg-gray-100 w-10 h-10 rounded-full cursor-pointer p-1" />
          </div>

          <div
            onClick={() => navigate('/')}
            className="flex justify-center items-center cursor-pointer">
            <span className="pr-1 font-sans text-4xl font-semibold">Yard</span>
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-6 before:bg-teal-700 ml-1">
              <span className="relative text-white text-2xl font-bold">Sale</span>
            </span>
          </div>
          
        </div>

        <div className="w-1/2 flex justify-end items-center gap-2">
          {/* save */}
          <div onClick={() => toggleLike(id)}
            className={` rounded-lg h-9 cursor-pointer flex justify-between items-center p-2 ${like ? "bg-gray-100" :"hover:bg-gray-100" }`}>
            <Heart size={20} className={`${like && "fill-red-600 text-red-600"}`} />
            <span className={`ml-1 text-sm ${like && "text-red-600"}`}>Save</span>
          </div>

          {/* share link */}
          <div className="relative">
            <div onClick={handleLink}
              className={`rounded-lg h-9 cursor-pointer flex justify-between items-center p-2 ${share ? "bg-gray-100" :"hover:bg-gray-100" }`}>
              <Share size={20} className={`${share && " text-teal-800"}`} />
              <span className={`ml-1 text-sm ${share && "text-teal-800"}`}>Share</span>
            </div>
              
            {share && (
              <div className="absolute bottom-10 inset-x-1 text-xs w-full text-red-600">
                Link Copied!
              </div>
            )}
          </div>

          {/* show images */}
          <div className="w-36">
            {currItem.images.length > 4 && !showImage ?
              (<div
                onClick={() => {
                  setShowImage(!showImage)
                  window.scrollTo({
                    top: 0,
                  });
                }}
                className="rounded-lg h-10 cursor-pointer flex justify-between items-center p-2 w-full hover:bg-gray-100">
                <Grip size={19}/>
                <span className="text-sm">Show all photos</span>
              </div>)
              : currItem.images.length > 4 &&
              (<div
                onClick={() => {
                  setShowImage(!showImage)
                  if (showImage) {
                    window.scrollTo({
                      top: 0,
                    });
                  }
                }}
                className="rounded-lg h-10 cursor-pointer flex justify-between items-center p-2 w-full hover:bg-gray-100">
                <CircleSlash2 size={18}/>
                <span className="text-sm mr-1">Hide all photos</span>
              </div>)
            }
          </div>
        </div>
      </div>

      <div className="mx-[13%]">

        {/* display images */}
        <div onClick={() => handleImagesClick()}
          className="mt-28 cursor-pointer">
          {/* see less photos */}
          {!showImage ? (
            <div className="flex flex-col">
              <div className="mb-4 text-4xl font-semibold">{currItem.title.includes("_") ? currItem.title.split("_")[0]: currItem.title}</div>
              
              <div className="grid grid-cols-2 gap-2">
                {/* left one image */}
                <div className="h-[456px]">
                  <img src={`${currItem.images[0].path}`}
                    alt={currItem.images[0].originalName || "image"}
                    className="overflow-hidden object-cover w-full h-full" />
                </div>
                {/* right 4 images */}
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    currItem.images[index + 1] ? (
                      <div key={index+1} className="bg-gray-500 h-56">
                        <img src={`${currItem.images[index+1].path}`}
                          alt={currItem.images[index + 1].originalName || "image"}
                          className="overflow-hidden object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div key={index} className="bg-gray-50 h-56">
                        <img src={comingsoon} alt="coming soon"
                          className="overflow-hidden object-cover w-full h-full" />
                      </div>// handle less pics situation
                    )
                  ))}
                </div>
              </div>

            </div>
            ) :
            ( 
            <div className="w-full">
              {/* see all photos control no more than 25 photos displayed */}
              <div className="columns-3 gap-4 space-y-4">
                {currItem.images.map((image, index) => {
                  const aspectClass = (index+1) % 3 === 0 ? "aspect-[3/2]" : "aspect-square"; 
                  return (
                    <img
                      key={image._id}
                      src={`${currItem.images[index].path}`}
                      className={`${aspectClass} w-full rounded-lg object-cover`}
                      alt={`Gallery image ${index + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* locations, time, title, details, tags etc. */}
        <div className="mt-10">
          <div className="text-3xl underline decoration-teal-700/30">{ currItem.address.address }</div>
          <div className="text-2xl my-3 text-red-600">{currItem.startDate}, 9 am to 5 pm</div>
          <div className="w-full border border-gray-300 mt-5 mb-8"></div>
          
          {/* goods, prices and conditions */}
          <div className="border-b mb-5">
            <span className="font-semibold text-lg">Price range</span>
            <div className="flex flex-wrap gap-5 mt-5 pb-5">
                <div
                  className="border rounded-lg flex justify-between items-center p-2 border-teal-600">
                  <span className=" text-teal-900 text-lg">{currItem.price}</span>
                </div>
            </div>
          </div>

          <div className="border-b my-5">
            <span className="font-semibold text-lg">Types of goods</span>
            <div className="flex flex-wrap gap-5 mt-5 pb-5">
              {currItem.types.map((item, idx) => (
                <div key={idx}
                  className="border rounded-lg flex justify-between items-center p-2 border-teal-600">
                  <span className=" text-teal-900 text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b mb-12">
            <span className="font-semibold text-lg">Conditions</span>
            <div className="flex flex-wrap gap-5 my-3 pb-3">
              {currItem.conditions.map((item, idx) => (
                <div key={idx}
                  className="border rounded-lg flex justify-between items-center p-2 border-teal-600">
                  <span className="text-lg text-teal-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* hosting details */}
          <div className="flex flex-col">
            <div className="text-2xl mb-5">Hosted by: </div>
            <div className="flex flex-row">

              {/* left side */}
              <div className="w-1/2 flex flex-col">

                <div className="w-4/5 h-64 shadow-2xl rounded-3xl flex justify-between items-center border border-gray-200">

                  <div className="flex flex-col w-2/3">
                    <div className="flex justify-center items-center flex-col">
                      <img src={`${currItem.images[0].path}`} alt="" className="h-28 w-28 rounded-full mb-6 " />
                      <div className="font-semibold text-2xl text-center">{user.username}</div>
                    </div>
                  </div>

                  <div className="flex flex-col w-1/3 justify-between items-center h-3/5">

                    <div className="h-1/2 w-full justify-center flex flex-col pb-5">
                      <div className="flex justify-center items-center text-lg">
                        <span className="mr-2">5.00</span>
                        <Star size={18} className="fill-red-300" />
                      </div>
                      <span className="text-sm text-center">Rating</span>
                      <div className="border-b border-b-gray-200 w-full mt-2"></div>
                    </div>

                    <div className="h-1/2 w-full justify-center flex flex-col ">
                      <div className="flex justify-center items-center text-lg">
                        <span className="mr-2 text-xl">3</span>
                        <Handshake size={18} />
                      </div>
                      <span className="text-sm text-center">Hosting time</span>
                      <div className="border-b border-b-gray-200 w-full mt-2"></div>
                    </div>

                  </div>
                  
                </div>

              </div>
                
              {/* right side */}
              <div className="w-1/2 h-64 flex flex-col">
                {rdSlogans.map((item, i) => (
                  <div key={i} className="w-full h-full flex items-center pl-3 shadow-lg rounded-2xl mb-1 bg-white">
                    {item.icon}
                    <span className="ml-3 text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* map of that location */}
        <div className="mt-28">
          <div className="flex flex-col justify-start mb-5">
            <span className="text-3xl mb-3">Where you will find it</span>
            <span className="font-light text-xl">{ currItem.address.address }</span>
          </div>

          {/* map here of the correponding location */}
          <div className="w-full">
            <MapOneItem />
            <div className="mt-7 border-b border-b-gray-300">
              <div className="font-light mb-2">The listed location for Yard Sale or Free Pickup may not be perfectly accurate, but it should be visible once you arrive.</div>
            </div>
          </div>
        </div>

      </div>

      <Footer/>
    </>
  )
}

export default DetailsPage