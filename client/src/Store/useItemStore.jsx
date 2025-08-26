import { create } from 'zustand'
import { persist } from 'zustand/middleware'



export const useItemStore = create(
  persist(
    (set) => ({
      items: [],
      currItem: null,
      randomItem: null,
      fetchedStatus: false,
      showItemsNumber: 6,
      pickedItem: null,
      myPosts: [],
      postChanges: false,

      updateItems: (userItems) => set({items: userItems, randomItem : userItems.length > 0 && userItems[Math.floor(Math.random() * userItems.length)]}),
      updateCurrItem: (item) => set({ currItem: item }),
      updateFetchedStatus: () => set({ fetchedStatus: true }),
      updateShowItemsNumber: (num) => set({ showItemsNumber: num }),
      updatePickedItem: (curr) => set({ pickedItem: curr }),

      updateMyPosts: (id) => set(state => ({
        myPosts: state.items?.filter(item => item.userId === id),
      })),

      updatePostChanges: () => set((state) => ({ postChanges: !state.postChanges}) )
    }),
    {
      name: 'item-picked', // localStorage key
      partialize: (state) => ({ pickedItem: state.pickedItem }),
    }
  )
)