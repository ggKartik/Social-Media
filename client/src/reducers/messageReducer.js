import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const messageReducer = createReducer(initialState, {
  createMessageRequest: (state, action) => {
    state.loading = true;
  },
  createMessageSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  createMessageFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getMessagesRequest: (state, action) => {
    state.loading = true;
  },
  getMessagesSuccess: (state, action) => {
    state.loading = false;
    state.messages = action.payload;
  },
  getMessagesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});
