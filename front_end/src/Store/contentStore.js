import create from "zustand";

export const contentStore = create((set, get) => ({
  contentStore: [],
  setNewMap: (newMap) => set({ contentStore: newMap }),
}));
