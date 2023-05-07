import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPosts } from "../actions/postAction";
import PostWidget from "./SinglePost";
import { clearErrors } from "../actions/userAction";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "@mui/material";
const PostComponent = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const { posts, error } = useSelector((state) => state.post);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (!isProfile) {
      dispatch(getPosts());
    } else {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, userId, isProfile, error]);

  return (
    <>
      {Object.keys(posts).length && (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          {posts.map((i) => (
            <PostWidget
              isProfile={isProfile}
              key={i._id}
              postId={i._id}
              postUserId={i.user}
              firstName={i.firstName}
              lastName={i.lastName}
              text={i.text}
              occupation={i.occupation}
              image={i.image.url}
              avatarUrl={i.avatarUrl}
              likes={i.likes}
              comments={i.comments}
            />
          ))}
        </>
      )}
    </>
  );
};

export default PostComponent;
