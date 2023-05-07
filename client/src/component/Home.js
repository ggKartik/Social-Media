import React, { Fragment, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import UserWidget from "./UserWidget";
import Loader from "../styledComponents/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserDetails, loadUser } from "../actions/userAction";
import MyPostWidget from "./MyPostWidget";
import AdvertWidget from "./AdvertWidget";
import FriendListWidget from "./FriendListWidget";
import PostComponent from "./PostComponent";
const Home = () => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { user } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget user={user} />
          <PostComponent userId={user._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget user={user} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
