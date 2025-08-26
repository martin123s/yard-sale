import { create } from 'zustand'
import axios from 'axios'


const API_URL = import.meta.env.VITE_URL + "/api/posts"
axios.defaults.withCredentials = true

export const usePostStore = create((set) => ({
  userId: null,
  error: null,
  progress: 0,

  sendPost: async (formData) => {
    set({ error: null, progress: 0 })
    try {
      await axios.post(`${API_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          set({ progress: percent })
        }
      })
      set({ progress: 100 })
    } catch (error) {
      const message = error?.response?.data?.message || error?.message ||  "Error sending post"
      set({ error: message, progress: 0 })
      throw new Error(message)
    }
  },

  clearProgress: () => set({ progress: 0 }),

  getItems: async () => {
    set({ error: null})
    try {
      const response = await axios.get(`${API_URL}`)
      const data = response.data
      set({ userId: data.userId })
      return data.items
    } catch (error) {
      const message = error?.message || error?.response?.data?.message || "Error getting items from backend"
      set({ error: message, userId: null})
      throw new Error(message)
    }
  },

  deletePost: async (deleteIds) => {
    set({ error: null })
    try {
      const res = await axios.delete(`${API_URL}`, {
        data: { deleteIds },
      });
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message ||  "Error deleting post"
      set({ error: message})
    }
  }

}))
