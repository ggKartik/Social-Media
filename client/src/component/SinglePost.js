import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../styledComponents/FlexBtw";
import Friend from "../styledComponents/Friend";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  getPosts,
  getUserPosts,
  likePost,
} from "../actions/postAction";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import toast, { Toaster } from "react-hot-toast";
import UserImage from "../styledComponents/UserImage";
import { useNavigate } from "react-router-dom";
const PostWidget = ({
  isProfile,
  postId,
  postUserId,
  firstName,
  lastName,
  text,
  occupation,
  image,
  avatarUrl,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const background = palette.background.alt;
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const { user } = useSelector((state) => state.user);
  const [Liked, setLiked] = useState(
    likes && likes.find((like) => like.user === user._id)
  );

  const [comment, setComment] = useState("");
  const [isComments, setIsComments] = useState(false);

  const { isLiked, isCommented, isDeleted } = useSelector(
    (state) => state.post
  );
  const likesCount = Object.keys(likes).length;
  const commentCount = Object.keys(comments).length;

  const likePostHandler = () => {
    setLiked(!Liked);
    dispatch(likePost(postId));
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      toast.error("Comment can't be empty");
    } else {
      toast.loading("Adding comment", {
        duration: 1500,
        position: "top-center",
      });
      dispatch(addComment(postId, comment));
      setComment("");
    }
  };

  const deleteCommentHandler = (commentId) => {
    toast.loading("Deleting comment", {
      duration: 1500,
      position: "top-center",
    });
    dispatch(deleteComment(postId, commentId));
  };

  useEffect(() => {
    if (
      isLiked === "liked" ||
      isLiked === "unliked" ||
      isCommented === true ||
      isDeleted === true
    )
      if (!isProfile) {
        {
          if (!isProfile) {
            dispatch(getPosts());
          } else {
            dispatch(getUserPosts(postUserId));
          }
        }
      }
  }, [isLiked, dispatch, isProfile, postUserId, isCommented, isDeleted]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <WidgetWrapper m="2rem 0">
        <Friend
          isProfile={isProfile}
          friendId={postUserId}
          firstName={firstName}
          lastName={lastName}
          imgUrl={avatarUrl}
          occupation={occupation}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {text}
        </Typography>
        {image && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={image}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={likePostHandler}>
                {Liked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likesCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{commentCount}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            <FlexBetween>
              <input
                type="text"
                placeholder="Add a comment..."
                style={{
                  width: "100%",
                  height: "2rem",
                  border: "none",
                  outline: "none",
                  padding: "0 1rem",
                  background: background,
                  color: main,
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={addCommentHandler}> Add </Button>
            </FlexBetween>
            <Divider />

            {comments.map((comment, i) => (
              <FlexBetween gap="1rem">
                <div className="avatarComment">
                  <UserImage image={comment.avatarUrl} size="35px" />
                </div>

                <Box
                  style={{
                    width: "100%",
                    padding: "0.5rem 0",
                    borderRadius: "0.75rem",
                  }}
                  onClick={() => {
                    navigate(`/profile/${comment.user}`);
                  }}
                >
                  <Typography
                    color={main}
                    variant="h6"
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {comment.firstName + " " + comment.lastName}
                  </Typography>
                  <Typography color={main} fontSize="0.9rem">
                    {comment.comment}
                  </Typography>
                </Box>
                <IconButton
                  sx={{
                    alignSelf: "flex-end",
                    color: "dark-grey",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                  onClick={() => {
                    deleteCommentHandler(comment._id);
                  }}
                >
                  {/* <DeleteRoundedIcon sx={{ color: main }} /> */}
                  <RemoveCircleOutlineIcon sx={{ color: main }} />
                </IconButton>
              </FlexBetween>
            ))}
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;
