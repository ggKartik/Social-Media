import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import FriendListWidget from "../component/FriendListWidget";
import MyPostWidget from "../component/MyPostWidget";
import PostComponent from "../component/PostComponent";
import UserWidget from "../component/UserWidget";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../actions/userAction";
const ProfilePage = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user, infoGathered } = useSelector((state) => state.userDetails);
  const { user: loggedInUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (infoGathered === false) {
      dispatch(getUserDetails(userId));
    }
  }, [userId, dispatch, infoGathered]);

  return (
    <>
      {Object.keys(user).length && (
        <Box>
          <Navbar />
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget user={user} isProfile={true} />
              <Box m="2rem 0" />
              <FriendListWidget user={user} />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              {user._id === loggedInUser._id && <MyPostWidget user={user} />}
              <Box m="2rem 0" />
              <PostComponent userId={userId} isProfile={true} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
