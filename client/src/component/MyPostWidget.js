import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../styledComponents/FlexBtw";
import UserImage from "../styledComponents/UserImage";
import widgetWrapper from "../styledComponents/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import Loader from "../styledComponents/Loader";
import { createPost } from "../actions/postAction";
import { clearErrors, getUserDetails } from "../actions/userAction";
import toast, { Toaster } from "react-hot-toast";

const MyPostWidget = ({ user }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // const { user, error } = useSelector((state) => state.userDetails);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //   }
  //   dispatch(getUserDetails(userId));
  // }, [dispatch, error, userId]);

  const handlePost = () => {
    const myForm = new FormData();
    myForm.append("text", text);
    myForm.append("image", image);
    dispatch(createPost(myForm));
  };

  const setImageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // function MyDropzone() {
  //   const onDrop = useCallback((acceptedFiles) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const binaryStr = reader.result;
  //       setImage(binaryStr);
  //     };
  //     reader.readAsDataURL(acceptedFiles[0]);
  //   }, []);
  //   const { getRootProps, getInputProps } = useDropzone({
  //     onDrop,
  //   });

  //   return (
  //     <FlexBetween>
  //       <Box
  //         {...getRootProps()}
  //         border={`2px dashed ${palette.primary.main}`}
  //         p="1rem"
  //         width="100%"
  //         sx={{ "&:hover": { cursor: "pointer" } }}
  //       >
  //         <input {...getInputProps()} />
  //         {!image ? (
  //           <p>Add Image Here</p>
  //         ) : (
  //           <FlexBetween>
  //             <Typography>Image Added</Typography>
  //             <EditOutlined />
  //           </FlexBetween>
  //         )}
  //       </Box>
  //       {image && (
  //         <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
  //           <DeleteOutlined />
  //         </IconButton>
  //       )}
  //     </FlexBetween>
  //   );
  // }

  return (
    <>
      {Object.keys(user).length && (
        <WidgetWrapper>
          <Toaster position="top-center" reverseOrder={false} />
          <FlexBetween gap="1.5rem">
            <UserImage image={user.avatar.url} />
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
              }}
            />
          </FlexBetween>
          {isImage && (
            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <input type="file" name="image" onChange={setImageHandler} />
            </Box>
          )}

          <Divider sx={{ margin: "1.25rem 0" }} />

          <FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>

            {isNonMobileScreens ? (
              <>
                <FlexBetween gap="0.25rem">
                  <GifBoxOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Clip</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                  <AttachFileOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                  <MicOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
              </>
            ) : (
              <FlexBetween gap="0.25rem">
                <MoreHorizOutlined sx={{ color: mediumMain }} />
              </FlexBetween>
            )}

            <Button
              disabled={!text}
              onClick={handlePost}
              sx={{
                color: palette.background.main,
                backgroundColor: palette.primary.alt,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </WidgetWrapper>
      )}
    </>
  );
};

export default MyPostWidget;
