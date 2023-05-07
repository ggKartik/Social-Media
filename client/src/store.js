import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./reducers/themeReducer";
import { userReducer } from "./reducers/userReducer";
import { getPostReducer } from "./reducers/postReducer";
import { userDetailsReducer } from "./reducers/userDetailsReducer";
import { messageReducer } from "./reducers/messageReducer";
import { chatReducer } from "./reducers/chatReducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    post: getPostReducer,
    userDetails: userDetailsReducer,
    message: messageReducer,
    chats: chatReducer,
  },
});
