import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "./post";
import { setPosts } from "../../../state";
import { RootState } from "../../../state";

const FeedPost = ({
  userId,
  isProfile = false,
}: {
  userId: string | undefined;
  isProfile: boolean;
}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const token = useSelector((state: RootState) => state.token);
  const mode = useSelector((state: RootState) => state.mode);

  console.log(posts);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:3001/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data;

    console.log(data);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await axios.get(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.data;
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refetchPosts = () => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  };

  if (posts.length === 0) {
    return (
      <div
        className={`text-glow h-[100%] w-[100%] rounded-lg p-8 text-xl font-bold ${
          mode === "light"
            ? "bg-slate-200 text-blue-900 shadow-lg"
            : "bg-[#062c43] text-blue-100"
        }  `}
      >
        <h1>No posts yet..</h1>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id,
            userId,
            userName,
            description,
            bio,
            picturePath,
            userPicturePath,
            likes,
            comments,
            createdAt,
          }) => (
            <Post
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${userName}`}
              description={description}
              bio={bio}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              refetchPosts={refetchPosts}
              createdAt={createdAt}
            />
          )
        )}
    </>
  );
};

export default FeedPost;
