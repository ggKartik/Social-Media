import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );

    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error.response.data.message,
    });
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "signupRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/v1/register", userData, config);

    dispatch({
      type: "signupSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "signupFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    await axios.get("/api/v1/logout");

    dispatch({
      type: "logoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userDetailsRequest" });

    const { data } = await axios.get(`/api/v1/user/${id}`);

    dispatch({
      type: "userDetailsSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userDetailsFailure",
      payload: error.response.data.message,
    });
  }
};

export const addFriend = (id) => async (dispatch) => {
  try {
    dispatch({ type: "addFriendRequest" });
    const { data } = await axios.put(`/api/v1/addfriend`, { id });

    dispatch({
      type: "addFriendSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "addFriendFailure",
      payload: error.response.data.message,
    });
  }
};

export const removeFriend = (id) => async (dispatch) => {
  try {
    dispatch({ type: "removeFriendRequest" });

    const { data } = await axios.put(`/api/v1/removefriend`, { id });

    dispatch({
      type: "removeFriendSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "removeFriendFailure",
      payload: error.response.data.message,
    });
  }
};

export const addSocailId = (twitter, linkedIn) => async (dispatch) => {
  try {
    dispatch({ type: "addSocailIdRequest" });

    const { data } = await axios.put(`/api/v1/addsocialid`, {
      twitter,
      linkedIn,
    });

    dispatch({
      type: "addSocailIdSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "addSocailIdFailure",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
