import create from "zustand";

export const loginStore = create((set, get) => ({
  jwtToken:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaXNzIjoiZ2FtYnllb2wiLCJpYXQiOjE2NDkwMzU1MzksImV4cCI6MTY0OTEyMTkzOX0.MrVLtV4qsET5nkyw9ff8FgJ-lttuCsQ-A2Uoe0onNqFRuythavU_UX7p4czfBI4zgQmK7dBRtvmGek3oqx6PWQ",
  userId: "",
  isLogined: () => !!get().jwtToken,
  getJwtToken: () => get().jwtToken,
  setLoginData: (token, pk) => set({ jwtToken: token, userId: pk }),
}));
