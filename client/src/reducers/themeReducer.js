import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

export const themeReducer = createReducer(initialState, {
  toggle: (state, action) => {
    state.theme = state.theme === "light" ? "dark" : "light";
  },
});
