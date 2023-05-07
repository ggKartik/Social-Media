import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBtw";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, clearErrors, getUserDetails, removeFriend } from "../actions/userAction";
import { useEffect } from "react";

const Friend = ({ friendId,firstName,lastName,imgUrl,occupation }) => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

  const { palette } = useTheme();
  const background = palette.background.alt;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  const { user,error,isAdded,isRemoved } = useSelector((state) => state.user);
  const { friends } = user; 
  
  const isFriend = friends.find((friend) => friend.user === friendId);

  const isMyProfile = user._id === friendId;
    
    const removeFriendHandler = (e) => { 
      e.preventDefault();
      toast.loading("Removing Friend", {
        duration: 1500
      });
      dispatch(removeFriend(friendId));
      
  }
  
  const addFriendHandler = (e) => { 
    e.preventDefault();
    dispatch(addFriend(friendId));
    toast.loading("Adding Friend", {
      duration: 1500
    });
  }



  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors())
    }
    if (isRemoved || isAdded) {
        dispatch(getUserDetails(user._id));  
    }
 
  }, [error , dispatch, isRemoved, isAdded, user._id]) 

  return (
    <>
      {Object.keys(user).length && (
        <FlexBetween>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: "14px",
                backgroundColor: background,
                color:main,
              }
            }}
          />
      <FlexBetween gap="1rem">
        <UserImage image={imgUrl} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {   firstName + " " + lastName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {occupation}
          </Typography>
        </Box>
      </FlexBetween>

      { isFriend ? (
        <IconButton
          sx={{p: "0.6rem" }}
              onClick={removeFriendHandler}
              disabled={isMyProfile}
        >
          {!isMyProfile ?<PersonRemoveOutlined sx={{ color: main }} /> : null}
      </IconButton>
      ) : (
          <IconButton
            sx={{p: "0.6rem" }}
                onClick={addFriendHandler}
                disabled={isMyProfile}
          >
                {!isMyProfile ? 
              <PersonAddOutlined sx={{ color: main }} />
              :null}
        </IconButton>
      )}

    </FlexBetween>
      )}
    
    </>
  );
};

export default Friend;