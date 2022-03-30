import create from "zustand";

export const submitStore = create((set) => ({
  file: "",
  previewURL: `${process.env.PUBLIC_URL}/image/add_image.svg`,
  alignment: "NORMAL",
  textValue: "",
  kakaoAdress: "",
  latitude: 0,
  longitude: 0,
  setFile: (file) => set({ file: file }),
  setPreviewURL: (URL) => set({ previewURL: URL }),
  setAlignment: (_, newAlignment) => set({ alignment: newAlignment }),
  setTextValue: (e) => set({ textValue: e.target.value }),
  setkakaoAdress: (newAdress) => set({ kakaoAdress: newAdress }),
  setLatitude: (newLatitude) => set({ latitude: newLatitude }),
  setLongitude: (newLongitude) => set({ longitude: newLongitude }),
  reset: () =>
    set({
      file: "",
      previewURL: `${process.env.PUBLIC_URL}/image/add_image.svg`,
      alignment: "NORMAL",
      textValue: "",
      kakaoAdress: "",
      latitude: 0,
      longitude: 0,
    }),
  // removeAllBears: () => set({ bears: 0 }),
}));
