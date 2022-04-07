import create from "zustand";

export const contentStore = create((set, get) => ({
  contents: [],
  setNewContents: (newContents) => set({ contents: newContents }),
}));
