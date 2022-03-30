import create from "zustand";

export const loginStore = create((set, get) => ({
  accessToken: "",
  userId: "",
  isLogined: () => !!get().userId,
  setLoginData: (token, pk) => set({ accessToken: token }, { userId: pk }),
}));
