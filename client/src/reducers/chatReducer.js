import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const chatReducer = createReducer(initialState, {
  createChatRequest: (state, action) => {
    state.loading = true;
  },
  createChatSuccess: (state, action) => {
    state.loading = false;
    state.chat = action.payload;
  },
  createChatFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  userChatRequest: (state, action) => {
    state.loading = true;
  },
  userChatSuccess: (state, action) => {
    state.loading = false;
    state.chat = action.payload;
  },
  userChatFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  findChatRequest: (state, action) => {
    state.loading = true;
  },
  findChatSuccess: (state, action) => {
    state.loading = false;
    state.chat = action.payload;
  },
  findChatFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});
