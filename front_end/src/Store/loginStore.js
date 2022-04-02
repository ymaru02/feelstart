import create from "zustand";

export const loginStore = create((set, get) => ({
  jwtToken: "",
  userId: "",
  isLogined: () => !!get().jwtToken,
  getjwtToekn: () => get().jwtToken,
  setLoginData: (token, pk) => set({ jwtToken: token, userId: pk }),
}));
