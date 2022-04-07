import create from "zustand";

export const loginStore = create((set, get) => ({
  jwtToken: "",
  userId: "",
  username: "",
  isLogined: () => !!get().jwtToken,
  setLoginData: (token, pk) => set({ jwtToken: token, userId: pk }),
  setUserName: (username) => set({ username: username }),
}));
