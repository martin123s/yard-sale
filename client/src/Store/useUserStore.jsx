import { create } from 'zustand'
import axios from 'axios'


const API_URL = import.meta.env.VITE_URL + "/api/user"


export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isCheckingAuth: false,
  isLoading: false,

  signup: async (username, email, password) => {
    set({ error: null, isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/signup`, { username, email, password }, { withCredentials: true })
      set({ user: response.data.user, isAuthenticated: true, isLoading: false})
      return response.data.user
    } catch (error) {
      set({ error: error.response.data.message || "error signing up", isLoading: false})
      throw error
    }
  },

  signin: async (email, password) => {
    set({ error: null, isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/signin`, { email, password }, { withCredentials: true })
      set({ user: response.data.user, isAuthenticated: true, error: null, isLoading: false })
      
    } catch (error) {
      set({ error: error.response.data.message || "error logging in", isLoading: false})
      throw error
    }
  },

  verifyEmail: async (code) => {
    set({ error: null, isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code }, { withCredentials: true })
      set({ user: response.data.user, isAuthenticated: true, isLoading: false })
      return response.data.user
    } catch (error) {
      set({ error: error.response.data.message || "error verifying email", isLoading: false})
      throw error
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null, isLoading: true })
    try {
      const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true })
      set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false, isLoading: false})
    } catch (error) {
      set({error: null, isCheckingAuth: false, isAuthenticated: false, isLoading: false})
    }
  }, 

  logout: async () => {
    set({ error: null, isLoading: true })
    try {
      await axios.post(`${API_URL}/logout`, { withCredentials: true })
      set({user: null, error: null, isAuthenticated: false, isLoading: false})
    } catch (error) {
      set({ error: "error logging out" , isLoading: false})
      throw error
    }
  },

  forgotPassword: async (email) => {
    set({ error: null, isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/forget-password`, { email }, { withCredentials: true })
      set({ user: response.data.user, isCheckingAuth: false, isAuthenticated: false, isLoading: false })
      return response.data.user
    } catch (error) {
      set({ error: error.response.data.message || "error verifying email in forgot password process", isLoading: false})
      throw error
    }
  },

  resetPassword: async (code, password, token) => {
    set({ error: null, isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { code, password }, { withCredentials: true })
      set({ user: response.data.user, isCheckingAuth: false, isAuthenticated: false, isLoading: false})
      return response.data.user
    } catch (error) {
      set({ error: error.response.data.message || "error when reset password", isLoading: false})
      throw error
    }
  },
}))