import create from "zustand";

export const mapStore = create((set, get) => ({
  map: "",
  isMap: () => !!get().map,
  setNewMap: (newMap) => set({ map: newMap }),
}));
