import { createReducer, current } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, {
  loginRequest: (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = action.payload;
  },
  signupRequest: (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  signupSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  signupFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
  loadUserRequest: (state, action) => {
    return {
      ...state,
      loading: true,
      isAuthenticated: false,
    };
  },
  loadUserSuccess: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  },
  loadUserFailure: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  },
  logoutRequest: (state, action) => {
    state.loading = true;
  },
  logoutSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
  },
  logoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  addFriendRequest: (state, action) => {
    state.loading = true;
    state.isAdded = false;
  },
  addFriendSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAdded = true;
  },
  addFriendFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAdded = false;
  },
  removeFriendRequest: (state, action) => {
    state.loading = true;
    state.isRemoved = false;
  },
  removeFriendSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isRemoved = true;
  },
  removeFriendFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isRemoved = false;
  },
  addSocailRequest: (state, action) => {
    state.loading = true;
    state.isAdded = false;
  },
  addSocailSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAdded = true;
  },
  addSocailFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAdded = false;
  },
});
