import React, { useEffect, useState } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  IconButton,
  Button,
} from "@mui/material";
import FlexBetween from "../styledComponents/FlexBtw";
import UserImage from "../styledComponents/UserImage";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addSocailId,
  clearErrors,
  getUserDetails,
  loadUser,
} from "../actions/userAction";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const UserWidget = ({ user, isProfile = false }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const linkedInHandler = () => {
    setOpen(!open);
  };

  const twitterHandler = () => {
    setOpen1(!open1);
  };

  const SubmitHandler = () => {
    dispatch(addSocailId(twitterUrl, linkedinUrl));
    dispatch(loadUser());
    setOpen(false);
    setOpen1(false);
  };

  return (
    <>
      {Object.keys(user).length && (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
              gap="0.5rem"
              pb="1.1rem"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <FlexBetween gap="1rem">
                <UserImage image={user.avatar.url} />
                <Box>
                  <Typography
                    variant="h4"
                    color={dark}
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography color={medium}>
                    {user.friends.length} friends
                  </Typography>
                </Box>
              </FlexBetween>
              <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                <Typography color={medium}>{user.country}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem">
                <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                <Typography color={medium}>{user.occupation}</Typography>
              </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
              <FlexBetween mb="0.5rem">
                <Typography color={medium}>
                  Who's viewed your profile
                </Typography>
                <Typography color={main} fontWeight="500">
                  {user.viewedProfile}
                </Typography>
              </FlexBetween>
              <FlexBetween>
                <Typography color={medium}>Impressions of your post</Typography>
                <Typography color={main} fontWeight="500">
                  {user.impressions}
                </Typography>
              </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
              <Typography
                fontSize="1rem"
                color={main}
                fontWeight="500"
                mb="1rem"
              >
                Social Profiles
              </Typography>

              <FlexBetween gap="1rem" mb="0.5rem">
                <FlexBetween gap="1rem">
                  <a href={user.linkedIn}>
                    <img
                      src="https://raw.githubusercontent.com/ed-roh/mern-social-media/master/server/public/assets/twitter.png"
                      alt="twitter"
                    />
                  </a>
                  <Box>
                    <Typography color={main} fontWeight="500">
                      Twitter
                    </Typography>
                    <Typography color={medium}>Social Network</Typography>
                  </Box>
                </FlexBetween>
                {!isProfile && (
                  <IconButton onClick={twitterHandler}>
                    <EditOutlined sx={{ color: main }} />
                  </IconButton>
                )}
              </FlexBetween>

              <FlexBetween gap="1rem">
                <FlexBetween gap="1rem">
                  <a href={user.linkedIn}>
                    <img
                      src="https://raw.githubusercontent.com/ed-roh/mern-social-media/master/server/public/assets/linkedin.png"
                      alt="linkedin"
                    />
                  </a>
                  <Box>
                    <Typography color={main} fontWeight="500">
                      Linkedin
                    </Typography>
                    <Typography color={medium}>Network Platform</Typography>
                  </Box>
                </FlexBetween>
                {!isProfile && (
                  <IconButton onClick={linkedInHandler}>
                    <EditOutlined sx={{ color: main }} />
                  </IconButton>
                )}
              </FlexBetween>
              <Dialog open={open} onClose={linkedInHandler}>
                <DialogTitle>Update Social Profile</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="linkedinUrl"
                    label="Linkedin Url"
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={linkedInHandler} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={SubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog open={open1} onClose={twitterHandler}>
                <DialogTitle>Update Social Profile</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="twitterUrl"
                    label="Twitter Url"
                    type="text"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={twitterHandler} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={SubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </WidgetWrapper>
        </>
      )}
    </>
  );
};

export default UserWidget;
