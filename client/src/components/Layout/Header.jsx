import React from 'react'
import Filter from '../UI/Filter.jsx'
import Post from '../UI/Post.jsx'
import MyPost from '../UI/MyPost.jsx'
import SearchBar from '../Map/SearchBar.jsx';

import {Sun, MoonStar, SlidersHorizontal, LogOut, Settings, Signature, Rss, UserCheck} from 'lucide-react';
import { useState, useEffect } from 'react';
import Scroll from './Scroll.jsx';
import { useNavigate } from 'react-router';
import { useUserStore } from '../../Store/useUserStore.jsx';
import { useItemStore } from '../../Store/useItemStore.jsx';
import { useLikesStore } from '../../Store/useLikesStore.jsx';
import { useMapDataStore } from '../../Store/useMapDataStore';



const Header = () => {

  const [day, setDay] = useState(true);
  const [log, setLog] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const { user, isAuthenticated, logout } = useUserStore()
  const { updateCurrItem } = useItemStore()
  const randomItem = useItemStore((state) => state.randomItem)
  
  const { postLikes } = useLikesStore()
  const currLikes = useLikesStore(state => state.currLikes)
  const updatePickedItem = useItemStore(state => state.updatePickedItem)

  const updateCenter = useMapDataStore(state => state.updateCenter)
  const orgCenter = useMapDataStore(state => state.orgCenter)
  const showMap = useMapDataStore(state => state.showMap)
  const toggleShowMap = useMapDataStore(state => state.toggleShowMap)
 
  const [filter, setFilter] = useState(false)
  const [post, setPost] = useState(false)
  const [mypost, setMypost] = useState(false)
  const [searchValue, setSearchValue] = useState({
    address: "",
    lat: null,
    lng: null,
  })
  
  const navigate = useNavigate()

  useEffect(() => {
    setLog(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await postLikes(currLikes)
      useItemStore.getState().updatePickedItem(null)
      localStorage.removeItem('item-picked')
    } catch (error) {
      console.error("Failed to post user likes:", error)
    } finally {
      await logout()
    }
  }

  const handleRandomItemClick = () => {
    updateCurrItem(randomItem)
    navigate(`/details/${randomItem._id}`)
  }

  const logoClick = () => {
    navigate('/')
    updatePickedItem(null)
  }

  useEffect(() => { 
    if (searchValue.address === "") {
      updateCenter({ ...orgCenter })
      return
    }
    if (searchValue.lat && searchValue.lng) { 
      updateCenter({ lat: searchValue.lat, lng: searchValue.lng })
      if (!showMap) {
        toggleShowMap()
      }
    }
  }, [searchValue.address])


  return (
    <>
      <div className="fixed top-0 left-0 w-full z-20">

        {/* top head */}
        <div className="bg-white h-16 flex flex-row items-center justify-between border-b border-b-gray-100">
          <div className="w-1/5 pl-[5%] flex justify-start items-center">
            {/* logo */}
            <div
              onClick={() => logoClick()}
              className="flex justify-center items-center cursor-pointer">
              <span className="pr-1 font-sans text-4xl font-semibold">Yard</span>
              <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-6 before:bg-teal-700 ml-1">
                <span className="relative text-white text-2xl font-bold">Sale</span>
              </span>
            </div>
            
          </div>

          {randomItem &&
            <span className="hidden md:flex w-3/5 justify-center items-center font-light">
              {`Zip code 04116 has`}
              <span className="mx-1 font-bold text-red-600">
                <div onClick={() => handleRandomItemClick()} className="cursor-pointer">
                  {`New ${randomItem.category} ! ! !`}
                </div>
              </span>
              <span className="ml-1">{randomItem.startDate}</span>
            </span>
          }

          <div className="w-1/2 md:w-1/3 lg:w-1/5 flex justify-between items-center pr-[5%] relative">
            <div className="w-2/5">
              <div
                onClick={() => setDay(!day)}
                className="ml-6 w-12 relative flex justify-center items-center border border-gray-400 rounded-full hover:border-red-600 h-6 cursor-pointer">
                {day ?
                  <Sun size={15} className="absolute left-0 ml-1" /> :
                  <MoonStar size={15} className="absolute right-0 mr-1" />
                }
              </div>
            </div>

            {!log ?
              (<div className="w-3/5 justify-between items-center flex">
                <a
                  onClick={() => navigate('/signin')}
                  className="w-1/2 flex justify-center items-center border-r border-r-gray-400 text-teal-700 cursor-pointer hover:text-red-600 mr-1 font-semibold">Log in</a>
                <a
                  onClick={() => navigate('/signup')}
                  className="w-1/2 flex justify-center items-center text-teal-700 hover:text-red-600 cursor-pointer font-semibold">Sign up</a>
              </div>)
              :
              (<>
                <div onClick={() => setPost(true)} className="rounded-sm p-1 text-sm cursor-pointer bg-teal-700 text-white border-b mr-2 hover:shadow-lg">New Post</div>
                {post && <Post setPost={setPost} />}

                <UserCheck size={23} className="cursor-pointer text-teal-700 fill-teal-700"
                  onClick={() => setUserProfile(!userProfile)}/>

                {/* Dropdown menu of user */}
                {userProfile && (
                  <div className="absolute right-[5%] top-8 mt-5 w-40 bg-white border border-gray-300 rounded-xl shadow-2xl z-50">
                    <ul className="py-2">
                      <li
                        className="flex items-center px-4 py-2 font-light text-gray-700 hover:bg-teal-700 hover:text-white"
                        onClick={() => setUserProfile(false)}>
                        <Signature size={16} className="mr-3" />
                        <p className="truncate">Hi, {log && user && user.username.slice(0, 8)}</p>
                        {/*  no more than 8 letters of first name */}
                      </li>
                        
                      <li
                        className="flex items-center px-4 py-2 font-light text-gray-700 hover:bg-teal-700 hover:text-white cursor-pointer"
                        onClick={() => {
                          setMypost(true)
                          setUserProfile(false)
                        }}>
                        <Rss size={16} className="mr-3" />
                        My posts
                      </li>
                        
                      <li
                        className="flex items-center px-4 py-2 font-light text-gray-700 hover:bg-teal-700 hover:text-white cursor-pointer mb-1"
                        onClick={() => setUserProfile(false)}>
                        <Settings size={16} className="mr-3" />
                        Settings
                      </li>

                      <li
                        className="mt-1 flex items-center px-4 py-2 font-light text-red-600 hover:bg-red-600 hover:text-white cursor-pointer border-t border-gray-300"
                        onClick={handleLogout}>
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
                {mypost && <MyPost setMypost={setMypost} />}
              </>)
            }
            
          </div>  
        </div>
        
        {/* second top head */}
        <div className="px-[5%] h-16 flex flex-row bg-white shadow-sm">
          {/* left side */}
          <div className="w-3/5 flex justify-start items-center">
            <Scroll/>
          </div>

          {/* right side search and filter */}
          <div className="w-2/5 flex justify-end items-center">

            {/* search bar */}
            <div className="w-[70%]">
              <SearchBar
                value={searchValue.address}
                onChange={(e) => setSearchValue(pre => ({
                  ...pre,
                  address: e.target.value
                }))}
                setValue={(val) => setSearchValue(val)}
                placeholder="Enter an address, city or Zip code"
                className="border-2 border-teal-700 shadow-sm rounded-lg"
              />
            </div>

            {/* filter */}
            <div
              onClick={() => setFilter(true)}
              className="ml-8 h-11 flex justify-between items-center rounded-md border-2 px-2 cursor-pointer border-teal-600 hover:bg-gray-100">
              <SlidersHorizontal size={16} />
              <span className="ml-2 font-light">Filters</span>
            </div>
            {filter && (<Filter setFilter={setFilter} />)}

          </div>
        </div>

      </div>
    </>
  )
}

export default Header