import { create } from 'zustand'

export const useMapDataStore = create((set) => ({
  center: {
    lat: 42.3949617,
    lng: -71.0798266,
  },
  orgCenter: {
    lat: 42.3949617,
    lng: -71.0798266,
  },
  showMap: false,

  updateCenter: (newCenter) => set({ center: newCenter }),
  toggleShowMap: () => set((state) => ({showMap: !state.showMap})),

}))