import create from 'zustand'

export const loginStore = create((set, get) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  isLogined: () => !!get().bears,
}))