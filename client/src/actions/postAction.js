import axios from "axios";

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: "createPostRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/createpost", post, config);
    dispatch({ type: "createPostSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "getPostsRequest" });
    const { data } = await axios.get("/api/v1/allposts");
    dispatch({ type: "getPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "getPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getUserPostsRequest" });
    const { data } = await axios.get(`/api/v1/user/post/${id}`);
    dispatch({ type: "getUserPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "getUserPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likePostRequest" });
    const { data } = await axios.put(`/api/v1/likepost/${id}`);
    dispatch({ type: "likePostSuccess", payload: data.isLiked });
  } catch (error) {
    dispatch({
      type: "likePostFailure",
      payload: error.response.data.message,
    });
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    dispatch({ type: "addCommentRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put("/api/v1/addcomment", { postId, comment }, config);

    dispatch({ type: "addCommentSuccess" });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCommentRequest" });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    await axios.put("/api/v1/deletecomment", { postId, commentId }, config);

    dispatch({ type: "deleteCommentSuccess" });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};
