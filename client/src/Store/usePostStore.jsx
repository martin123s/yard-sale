import { create } from 'zustand'
import axios from 'axios'
import api from '../utils/AxiosConnt.jsx'


const API_URL = "/api/posts"


export const usePostStore = create((set) => ({
  userId: null,
  error: null,
  progress: 0,

  sendPost: async (formData) => {
    set({ error: null, progress: 0 })
    try {
      await api.post(`${API_URL}`, formData, {
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
      const response = await api.get(`${API_URL}`)
      const data = response.data
      set({ userId: data.userId })
      return data.items
    } catch (error) {
      const message = error?.message || error?.response?.data?.message || "Error getting items from backend"
      console.log("error message", message)
      set({ error: message, userId: null})
      throw new Error(message)
    }
  },

  deletePost: async (deleteIds) => {
    set({ error: null })
    try {
      const res = await api.delete(`${API_URL}`, {
        data: { deleteIds },
      });
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message ||  "Error deleting post"
      set({ error: message})
    }
  }

}))
