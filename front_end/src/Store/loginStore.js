import create from "zustand";

export const loginStore = create((set, get) => ({
  jwtToken: "",
  userId: "",
  isLogined: () => !!get().jwtToken,
  getJwtToken: () => get().jwtToken,
  setLoginData: (token, pk) => set({ jwtToken: token, userId: pk }),
}));
