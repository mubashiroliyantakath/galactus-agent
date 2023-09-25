import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const navState = create(
    persist(
      (set, get) => ({
        active: "overview-nav",
        setActiveTab: (id) => set(() => ({ active: id })),
      }),
      {
        name: 'nav-state-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )


// const navState = create((set) => ({
//   active: "overview-nav",
//   setActiveTab: (id) => set(() => ({ active: id })),
// }))

export default navState;
