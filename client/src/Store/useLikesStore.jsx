import { create } from 'zustand'
import axios from 'axios'


const API_URL = import.meta.env.VITE_URL + "/api/likes"

export const useLikesStore = create((set, get) => ({
  userId: null,
  likes: {},
  currLikes: {},
  error: null,
  timer: null,
  
  postLikes: async (userLikes) => {
    set({ error: null})
    try {
      const cleanedLikes = Object.fromEntries(
        Object.entries(userLikes).filter(
          ([_, v]) => typeof v === "boolean"
        )
      );
      await axios.post(`${API_URL}`, { likes: cleanedLikes }, { withCredentials: true })
    } catch (error) {
      const message = error?.response?.data?.message || error?.message ||  "Error saving user likes"
      set({ error: message, likes: {}, userId: null})
      throw new Error(message)
    }
  },

  getLikes: async () => {
    set({ error: null})
    try {
      const response = await axios.get(`${API_URL}`, { withCredentials: true })
      set({ userId: response.data.userId, likes: response.data.likes })
      return response.data.likes
    } catch (error) {
      const message = error?.response?.data?.message || error?.message ||  "Error getting user likes"
      set({ error: message, likes: null, userId: null})
      throw new Error(message)
    }
  },

  updateCurrLikes: (incomingLikes) =>
    set((state) => {
      if (!incomingLikes || typeof incomingLikes !== 'object') return state
      const update = Object.keys(state.currLikes).length === 0
      return {
        currLikes: update ? incomingLikes : state.currLikes
      }
    }
  ),
  
  removeLikes: (ids) =>
    set((state) => {
      const newLikes = { ...state.currLikes }
      ids.forEach((id) => {
        delete newLikes[id] // remove the entry
      })
      return { currLikes: newLikes }
    }),

  toggleLike: (cardId) =>
    set((state) => ({
      currLikes: {
        ...state.currLikes,
        [cardId]: !state.currLikes[cardId],
      },
    })),
  
  isLiked: (cardId) => {
    const currLikes = get().currLikes
    return !!(cardId && typeof cardId === 'string' && currLikes[cardId])
  },

  updateTime: (curr) => set({ timer: curr }),
  
}))
