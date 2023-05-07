import axios from "axios";

export const getChat = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userChatRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/v1/userchat/${id}`, config);

    dispatch({ type: "userChatSuccess", payload: data.newchat });
  } catch (error) {
    dispatch({
      type: "userChatFailure",
      payload: error.response.data.message,
    });
  }
};
