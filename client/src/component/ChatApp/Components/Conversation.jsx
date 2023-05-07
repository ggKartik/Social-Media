import React from 'react'
import FlexBetween from '../../../styledComponents/FlexBtw';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserImage from '../../../styledComponents/UserImage';
import { Box, IconButton, Typography, useTheme } from "@mui/material";

const Conversation = (
  {firstName,lastName,avatarUrl}
) => {
  const navigate = useNavigate();
  
  const { palette } = useTheme();
  const background = palette.background.alt;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;




    return (
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
        <UserImage image={avatarUrl} size="55px" />
        <Box
          // onClick={() => {
          //   navigate(`/profile/${friendId}`);
          // }}
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
        </Box>
      </FlexBetween>
        </FlexBetween>
  )
}

export default Conversation