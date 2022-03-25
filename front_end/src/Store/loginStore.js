import create from "zustand";

export const loginStore = create((set, get) => ({
  login: false,
  doLogin: () => set(() => ({ login: true })),
  isLogined: () => get().login,
}));
