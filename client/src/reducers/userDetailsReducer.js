import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: null,
  infoGathered: false,
};

export const userDetailsReducer = createReducer(initialState, {
  userDetailsRequest: (state, action) => {
    state.loading = true;
  },
  userDetailsSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.infoGathered = true;
  },
  userDetailsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});
