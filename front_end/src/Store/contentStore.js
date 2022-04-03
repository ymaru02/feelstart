import create from "zustand";

export const contentStore = create((set, get) => ({
  contents: [],
  setNewMap: (newMap) => set({ contents: newMap }),
}));
