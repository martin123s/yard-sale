import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import MapManyItems from '../components/MapManyItems'
import ToggleMapList from '../components/ToggleMapList'

import { usePostStore } from '../Store/usePostStore';
import { useLikesStore } from "../Store/useLikesStore";
import { useItemStore } from '../Store/useItemStore';
import { useMapDataStore } from '../Store/useMapDataStore';
import { useUserStore } from '../Store/useUserStore'


const HOURS = import.meta.env.VITE_TIME_HOUR

const HomePage = () => {

  const { getItems } = usePostStore()
  const { postLikes, getLikes, updateCurrLikes } = useLikesStore()
  const currLikes = useLikesStore(state => state.currLikes)
  const timer = useLikesStore(state => state.timer)
  
  const { updateFetchedStatus, fetchedStatus, updateItems } = useItemStore()
  const items = useItemStore(state => state.items)
  const updateMyPosts = useItemStore(state => state.updateMyPosts)
  const postChanges = useItemStore(state => state.postChanges)
  const updatePostChanges = useItemStore(state => state.updatePostChanges)

  const user = useUserStore(state => state.user)
  const id = user._id

  const showMap = useMapDataStore(state => state.showMap)

  // fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const tempItems = await getItems()
        updateItems(tempItems)
        updateMyPosts(id)
      } catch (error) {
        console.error("Failed to fetch items:", error)
      }
    }

    if (!fetchedStatus) {
      fetchItems()
      updateFetchedStatus()
    }

    if (postChanges) {
      fetchItems()
      updatePostChanges()
    }
  }, [fetchedStatus, postChanges])

  // fetch use likes from backend
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const tempLikes = await getLikes()
        updateCurrLikes(tempLikes.likes)
      } catch (error) {
        console.error("Failed to fetch user likes:", error)
      }
    }

    fetchLikes()
  }, [items])

  // post user likes
  useEffect(() => {
    if (!timer) return
    const diff = timer + (1000 * 60 * 60 * HOURS) - Date.now()

    const timeoutId = setTimeout(() => {
      const postToBackend = async () => {
        try {
          await postLikes(currLikes)
        } catch (error) {
          console.error("Failed to post user likes:", error)
        }
      }

      postToBackend()
    }, diff)

    return () => clearTimeout(timeoutId)
  }, [timer])

  

  return (
    <>
      <Header />
      <ToggleMapList />

      {!showMap ?
        <>
          <Cards />
          <Footer />
        </>
        :
        <MapManyItems />
      }
            
    </>
  )
}

export default HomePage