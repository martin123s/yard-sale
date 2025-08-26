import React, { useState, useEffect, useCallback } from 'react'
import { X, Trash2 } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import { useItemStore } from '../Store/useItemStore';
import { usePostStore } from '../Store/usePostStore';
import { useLikesStore } from '../Store/useLikesStore';




const MyPost = ({setMypost}) => {

  const myPosts = useItemStore(state => state.myPosts)
  const updatePostChanges = useItemStore(state => state.updatePostChanges)
  const deletePost = usePostStore(state => state.deletePost)
  const removeLikes = useLikesStore(state => state.removeLikes)
  const { postLikes } = useLikesStore()
  const currLikes = useLikesStore(state => state.currLikes)

  const [trash, setTrash] = useState(new Set());
  const toggleDelete = (id) => {
    setTrash((prev) => {
      const deleteSet = new Set(prev);
      if (deleteSet.has(id)) {
        deleteSet.delete(id)
      } else {
        deleteSet.add(id)
      }
      return deleteSet;
    });
  };

  const [msg, setMsg] = useState()

  const handleDeletePosts = async () => {
    if(trash.size === 0) return
    try {
      const deleteIds = [...trash]
      removeLikes(deleteIds)
      await postLikes(currLikes)
      const data = await deletePost(deleteIds)
      setMsg(data.message)
      updatePostChanges() // inform to get the new posts from backend
    } catch (error) {
      setMsg("Deleting posts failed")
    }
  }

  useEffect(() => {
    if (!msg) return
    const timer = setTimeout(() => {
      setMsg(null)
    }, 6000)

    return () => clearTimeout(timer)
  }, [msg])



  return (
    <div
      className="fixed inset-0 bg-opacity-60 bg-gray-950 flex justify-center items-center z-50">

      <div
        className="bg-white shadow-2xl w-[40%] h-[98vh] flex flex-col rounded-xl"
        onClick={(e) => e.stopPropagation()} >
        
        {/* Fixed Header */}
        <div className="flex h-20 justify-between items-center border-b px-12 bg-white sticky top-0 rounded-t-xl mb-3">
          {!msg ?
            <>
              <span className="text-xl font-semibold rounded-lg border-2 border-gray-300 p-2 shadow-xl">My Posts</span>
              <X size={35} onClick={() => setMypost(false)} className="cursor-pointer hover:bg-gray-100 rounded-full w-12" />
            </>
            :
            <div className='text-3xl text-red-500 font-semibold'>
              { msg }
            </div>
          }
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-12 py-3">

          <div className="grid gap-7">
            {myPosts.length === 0 ?
              <div className="my-10 text-3xl text-red-600">Oops, you don't have any post yet! </div> :
              myPosts.map((item) => (
                <div key={item._id} className="grid grid-cols-6 w-full gap-3">
                  <div className={`col-span-5 rounded-xl ${trash.has(item._id)? "bg-emerald-600 text-white" :"text-black border-2 border-teal-400"}  w-full h-12 flex items-center pl-2`}>
                    {item.title}
                  </div>
                  <div onClick={() => toggleDelete(item._id)}
                    className={`col-span-1 rounded-xl ${trash.has(item._id)? "bg-red-600 text-white": "text-black border-2 border-pink-500"} w-full h-12 grid justify-center content-center text-xl cursor-pointer`}>
                    <Trash2 />
                  </div>
                </div>
              ))
            }
          </div>
          
        </div>

        {/* Fixed bottom */}
        <div className="flex h-20 justify-between items-center px-10 bg-white sticky bottom-0 rounded-b-xl my-2 border-t-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div
            onClick={() => setTrash(new Set())}
            className="mt-1 border rounded-lg flex justify-end items-center cursor-pointer bg-emerald-600 text-white py-2 px-4 hover:shadow-xl hover:shadow-gray-300">
              Clear chosen
          </div>

          <div
            onClick={handleDeletePosts}
            className="mt-1 w-24 border border-red-600 rounded-lg flex justify-center items-center cursor-pointer text-white bg-red-600 py-2 px-4 hover:shadow-xl hover:shadow-gray-300 font-semibold">
              Delete
          </div>
        </div>

      </div>
    </div>
  )
}

export default MyPost