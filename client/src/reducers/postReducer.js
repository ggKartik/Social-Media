import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  isCreated: false,
};

export const createPostReducer = createReducer(initialState, {
  createPostRequest: (state, action) => {
    state.loading = true;
  },
  createPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload.post;
    state.isCreated = true;
  },
  createPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});

export const getPostReducer = createReducer(initialState, {
  getPostsRequest: (state, action) => {
    state.loading = true;
  },
  getPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  getPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getUserPostsRequest: (state, action) => {
    state.loading = true;
  },
  getUserPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  getUserPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  likePostRequest: (state, action) => {
    state.loading = true;
  },
  likePostSuccess: (state, action) => {
    state.loading = false;
    state.isLiked = action.payload;
  },
  likePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isLiked = false;
  },
  addCommentRequest: (state, action) => {
    state.loading = true;
    state.isCommented = false;
  },
  addCommentSuccess: (state, action) => {
    state.loading = false;
    state.isCommented = true;
  },
  addCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isCommented = false;
  },
  deleteCommentRequest: (state, action) => {
    state.loading = true;
    state.isDeleted = false;
  },
  deleteCommentSuccess: (state, action) => {
    state.loading = false;
    state.isDeleted = true;
  },
  deleteCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isDeleted = false;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});
