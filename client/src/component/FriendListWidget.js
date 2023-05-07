import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../styledComponents/Friend";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUserDetails } from "../actions/userAction";
import toast, { Toaster } from "react-hot-toast";

const FriendListWidget = ({ user }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  // const { user, error } = useSelector((state) => state.userDetails);
  const { friends } = user;

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //   }
  //   dispatch(getUserDetails(userId));
  // }, [dispatch, userId]);

  return (
    <>
      {Object.keys(user).length && (
        <WidgetWrapper>
          <Toaster position="top-center" reverseOrder={false} />
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
          >
            Friend List
          </Typography>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend.user}
                firstName={friend.firstName}
                lastName={friend.lastName}
                imgUrl={friend.avatarUrl}
                occupation={friend.occupation}
              />
            ))}
          </Box>
        </WidgetWrapper>
      )}
    </>
  );
};

export default FriendListWidget;
