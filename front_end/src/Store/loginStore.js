import create from "zustand";

export const loginStore = create((set) => ({
  userId: "",
  setUserId: (pk) => set({ userId: pk }),
}));
