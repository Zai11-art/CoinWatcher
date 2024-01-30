import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IoChatboxEllipsesOutline, IoCheckmarkOutline, IoCloseOutline, IoHeart, IoHeartOutline, IoRepeatOutline, IoSendOutline, IoTimerOutline, IoTrashBinOutline } from "react-icons/io5";

import Following from "./following-list";
import { setPost } from "../../../state";
import { setPosts } from "../../../state";
import { RootState } from "../../../state";
import { setComments } from "../../../state";
import { dateReformat } from "../../../state/utils/utils";
import { dateConverter } from "../../../state/utils/utils";

interface Postypes {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  bio: string;
  picturePath: string;
  userPicturePath: string;
  likes: any[];
  comments: any[];
  refetchPosts: () => void;
  createdAt: string;
}

const Post = ({
  postId,
  postUserId,
  name,
  description,
  bio,
  picturePath,
  userPicturePath,
  likes,
  comments,
  refetchPosts,
  createdAt,
}: Postypes) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token);
  const mode = useSelector((state: RootState) => state.mode);
  const loggedUser = useSelector((state: RootState) => state.user);
  const loggedInUserId = loggedUser?._id;
  const _id = loggedUser?._id;
  const userName = loggedUser?.userName;
  const commentImageUser = loggedUser?.picturePath;
  // @ts-ignore
  const isLiked = likes && loggedInUserId ? Boolean(likes[loggedInUserId]) : false;
  const likeCount = Object.keys(likes).length;
  const commentCount = Object.keys(comments).length;

  // handling confirmation boxes
  const [showConfirmationPosts, setShowConfirmationPosts] = useState(false);
  const [showConfirmationComments, setShowConfirmationComments] =
    useState(false);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));
  };

  const handleCommentSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      postId: postId,
      userName: userName,
      comment: comment,
      commentor: _id,
      picturePath: commentImageUser,
    };
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const comments = await response.json();
    dispatch(setComments(comments));

    console.log(comments);
    setComment("");
    refetchPosts();
  };

  const handleDeleteComment = async (commentId: string) => {
    console.log(commentId);

    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ commentId }),
      }
    );

    const comments = await response.json();
    console.log(comments);
    dispatch(setComments(comments));
    refetchPosts();
  };

  const handleDeletePost = async (postId: string) => {
    const data = postId;

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId: data }),
    });

    const fetchedData = await response.json();
    console.log(fetchedData);
    dispatch(setPosts({ posts: fetchedData }));
    refetchPosts();
  };

  return (
    <div
      className={`mb-9 h-[100%] w-[100%] rounded-xl ${
        mode === "light" ? "bg-slate-200 shadow-xl" : "bg-[#062c43]"
      }  p-4`}
    >
      <div
        className={`rounded-2xl ${
          mode === "light"
            ? "bg-slate-300/20 text-slate-900 shadow-inner"
            : "bg-[#091b25] text-white"
        } p-4`}
      >
        <Following
          friendId={postUserId}
          name={name}
          subtitle={bio}
          userPicturePath={userPicturePath}
        />

        {loggedInUserId == postUserId && (
          <div className="flex flex-row-reverse">
            <button
              onClick={() => setShowConfirmationPosts(!showConfirmationPosts)}
              className="mr-2 flex  cursor-pointer flex-row-reverse items-center text-xl text-red-500 hover:text-red-200 active:text-blue-500"
            >
              <span
                className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
                  mode === "light" ? "bg-slate-100 shadow-lg" : "bg-[#0f405e]"
                }  text-[1.4rem]`}
              >
                <IoTrashBinOutline />
              </span>
            </button>

            {showConfirmationPosts && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div
                  className={`w-[250px] rounded-lg border-[0.02px] ${
                    mode === "light"
                      ? "border-slate-500/40 bg-slate-200 text-blue-900 shadow-blue-200/10"
                      : "border-slate-500/40 bg-[#041625] text-blue-100 shadow-blue-200/10"
                  } p-6 shadow-xl  `}
                >
                  {/* Pop-up content goes here */}
                  <h2 className="mb-4 text-lg font-bold">Delete This Post?</h2>
                  <div className="flex flex-col">
                    <span
                      onClick={() => {
                        toast.success("Post deleted Successfully", {
                          theme: `${mode === "light" ? "light" : "colored"}`,
                        });
                        handleDeletePost(postId);
                      }}
                      className={`cursor-pointer text-[17px] font-semibold ${
                        mode === "light"
                          ? "rounded-lg p-1 text-green-500 hover:bg-slate-300 hover:text-green-500"
                          : "rounded-lg p-1 text-green-300 hover:bg-[#193952] hover:text-green-100"
                      }  transition-all ease-in-out `}
                    >
                      <IoCheckmarkOutline /> Confirm
                    </span>
                    <div className="my-1 mt-1  h-[1px] w-full bg-gray-600"></div>
                    <span
                      onClick={() =>
                        setShowConfirmationPosts(!showConfirmationPosts)
                      }
                      className={`cursor-pointer text-[17px] font-semibold ${
                        mode === "light"
                          ? "rounded-lg p-1 text-red-500 hover:bg-slate-300 hover:text-red-500"
                          : "rounded-lg p-1 text-red-300 hover:bg-[#193952] hover:text-red-100"
                      }  transition-all ease-in-out `}
                    >
                      <IoCloseOutline /> Cancel
                    </span>
                    <div className="my-1 mt-1  h-[1px] w-full bg-gray-600"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-3">
          <p className="">{description}</p>
        </div>

        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            src={`${picturePath}`}
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        )}

        <div className="group relative mt-2 flex w-28">
          <div
            data-popover-target="popover-default"
            className={`mr-1 text-[1rem] text-slate-900 hover:text-red-400`}
          >
            <IoTimerOutline />
          </div>
          <div
            className={`absolute z-[100] hidden w-[150px] rounded-lg ${
              mode === "light"
                ? "text-glow bg-slate-100 text-blue-900 shadow-xl"
                : "bg-[#06132b] text-red-200 shadow-red-800/80"
            }  p-3 shadow-md  group-hover:block`}
          >
            <p className="text-xs font-bold">{dateReformat(createdAt)}</p>
          </div>
          <span className="mx-1 mb-1 text-[0.8rem] font-thin">
            {dateConverter(createdAt)}
          </span>
        </div>

        <div className="mt-5 flex flex-row justify-between font-thin ">
          <span className="text-sm md:text-lg lg:text-lg xl:text-lg">
            {likeCount} Likes
          </span>
          <span
            className="cursor-pointer text-sm hover:underline md:text-lg lg:text-lg xl:text-lg"
            onClick={() => {
              setIsComments(!isComments);
            }}
          >
            {commentCount} Comments
          </span>
        </div>
        <div
          className={`my-1 mt-1  h-[1px] w-full ${
            mode === "light" ? "" : "bg-gray-600"
          }`}
        ></div>

        <div
          className={`flex w-[100%] flex-row justify-between rounded-lg ${
            mode === "light"
              ? "bg-slate-300/30 text-slate-900 shadow-md"
              : "bg-[#071b27] text-white"
          }  p-1`}
        >
          <div
            onClick={patchLike}
            className={`flex w-full cursor-pointer items-center justify-center rounded-l-lg px-[2%] py-1 font-bold
           transition-all ease-in-out ${
             mode === "light"
               ? "hover:bg-blue-400 hover:text-slate-100"
               : "hover:bg-blue-300 hover:text-black"
           }  md:px-[3%]`}
          >
            {isLiked ? (
              <div className="flex items-center">
                <span className="text-md flex text-blue-400 md:text-xl lg:text-xl xl:text-xl">
                  <IoHeart />
                </span>
                <span className="ml-1 text-sm text-blue-400  md:text-lg lg:text-lg xl:text-lg">
                  Liked
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-md flex md:text-xl lg:text-xl xl:text-xl">
                  <IoHeartOutline />
                </span>
                <span className="ml-1 text-sm md:text-lg lg:text-lg xl:text-lg ">
                  Like
                </span>
              </div>
            )}
          </div>

          <div
            onClick={() => setIsComments(!isComments)}
            className={`flex w-full cursor-pointer items-center justify-center px-[2%] py-1 font-bold
            transition-all ease-in-out ${
              mode === "light"
                ? "hover:bg-blue-400 hover:text-slate-100"
                : "hover:bg-blue-300 hover:text-black"
            }  md:px-[3%]`}
          >
            <span className="text-md flex md:text-xl lg:text-xl xl:text-xl ">
              <IoChatboxEllipsesOutline />
            </span>
            <span className="ml-1 text-sm md:text-lg lg:text-lg xl:text-lg ">
              Comment
            </span>
          </div>
          <div
            className={`flex w-full cursor-pointer items-center justify-center rounded-r-lg px-[2%] py-1 font-bold
            transition-all ease-in-out ${
              mode === "light"
                ? "hover:bg-blue-400 hover:text-slate-100"
                : "hover:bg-blue-300 hover:text-black"
            }  md:px-[3%]`}
          >
            <span className="text-md flex md:text-xl lg:text-xl xl:text-xl ">
              <IoRepeatOutline />
            </span>
            <span className="ml-1 text-sm md:text-lg lg:text-lg xl:text-lg ">
              Repost
            </span>
          </div>
        </div>
        <div
          className={`my-1 mt-1  h-[1px] w-full ${
            mode === "light" ? "" : "bg-gray-600"
          }`}
        ></div>
        {isComments && (
          <>
            <div
              className={`flex h-[100%] w-[100%] flex-row justify-around rounded-xl ${
                mode === "light"
                  ? "bg-slate-300/20 shadow-inner"
                  : "bg-[#051925]"
              }  p-3`}
            >
              <div className="h-14 w-14">
                <img
                  className="h-12 w-12 rounded-full bg-blue-900 "
                  src={`${commentImageUser}`}
                  alt="user image"
                />
              </div>
              <form className="flex w-full">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  className={`mx-3 flex w-full resize-none items-center overflow-hidden rounded-2xl text-sm md:text-lg lg:text-lg xl:text-lg ${
                    mode === "light"
                      ? "bg-slate-300/50 text-blue-900"
                      : "bg-[#030c11] text-white"
                  }`}
                  placeholder="Comment here..."
                  name="comment"
                  rows={1}
                  style={{
                    height: "50px",
                    minHeight: "40px",
                    minWidth: "60%",
                    wordWrap: "break-word",
                  }}
                  onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                ></textarea>
                <button
                  onClick={(e) => {
                    handleCommentSubmit(e);
                    toast.success(`Comment submitted.`, {
                      theme: `${mode === "light" ? "light" : "colored"}`,
                    });
                    setComment("");
                  }}
                  type="submit"
                  className={`mr-1 cursor-pointer text-2xl ${
                    mode === "light"
                      ? "text-blue-500 hover:text-blue-400 "
                      : "text-white hover:text-blue-400 "
                  } `}
                >
                  <IoSendOutline />
                </button>
              </form>
            </div>

            {comments?.map(
              (comment: {
                userPicturePath: string;
                userName: string;
                createdAt: string;
                userId: string;
                _id: string;
                comment: string;
              }) => (
                <div className=" h-[100%] w-[100%] pt-1">
                  <div className=" flex h-[100%] w-[100%]  p-3">
                    <img
                      className={`mt-1 h-12 w-12 rounded-full ${
                        mode === "light"
                          ? "bg-slate-300 shadow-inner"
                          : "bg-blue-900"
                      }  p-1`}
                      src={`${comment.userPicturePath}`}
                      alt="commentor image"
                    />

                    <div
                      className={`ml-4 flex h-[100%]  flex-col rounded-xl ${
                        mode === "light"
                          ? "bg-slate-300/30 shadow-inner"
                          : "bg-[#0c1327] shadow-inner"
                      } p-2 px-5 py-3`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center">
                          <span className="mb-1 mr-2 text-sm font-bold md:text-lg lg:text-lg xl:text-lg">
                            {comment?.userName}
                          </span>

                          {/* time hover popup */}
                          <div className="group relative">
                            <div
                              data-popover-target="popover-default"
                              className={`mr-1 text-[1remm] text-slate-900 hover:text-red-400`}
                            >
                              <IoTimerOutline />
                            </div>
                            <div
                              className={`absolute z-[100] hidden w-[150px] rounded-lg ${
                                mode === "light"
                                  ? "text-glow bg-slate-100 text-blue-900 shadow-xl"
                                  : "bg-[#06132b] text-red-200 shadow-red-800/80"
                              }  p-3 shadow-md  group-hover:block`}
                            >
                              <p className="text-sm font-bold">
                                {dateReformat(comment?.createdAt)}
                              </p>
                            </div>
                          </div>

                          <span className="mx-1 mb-1 text-[0.8rem] font-thin">
                            {dateConverter(comment?.createdAt)}
                          </span>
                        </div>

                        {comment.userId == _id && (
                          <>
                            <button
                              onClick={() =>
                                setShowConfirmationComments(
                                  !showConfirmationComments
                                )
                              }
                              className="ml-2 flex  cursor-pointer items-center text-xl text-red-500 hover:text-red-200 active:text-blue-500"
                            >
                              <span
                                className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${
                                  mode === "light"
                                    ? "bg-blue-300/50 shadow-xl"
                                    : "bg-[#0b293b]"
                                }  text-[1.6rem]`}
                              >
                                <IoCloseOutline />
                              </span>
                            </button>

                            {showConfirmationComments && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                                <div
                                  className={`w-[250px] rounded-lg border-[0.02px] ${
                                    mode === "light"
                                      ? "border-slate-500/40 bg-slate-200 text-blue-900 shadow-blue-200/10"
                                      : "border-slate-500/40 bg-[#041625] text-blue-100 shadow-blue-200/10"
                                  } p-6 shadow-xl  `}
                                >
                                  {/* Pop-up content goes here */}
                                  <h2 className="mb-4 text-lg font-bold ">
                                    Delete This Comment?
                                  </h2>
                                  <div className="flex flex-col">
                                    <span
                                      onClick={() => {
                                        toast.success(`Comment deleted.`, {
                                          theme: `${
                                            mode === "light"
                                              ? "light"
                                              : "colored"
                                          }`,
                                        });
                                        handleDeleteComment(comment._id);
                                        setShowConfirmationComments(
                                          !showConfirmationComments
                                        );
                                      }}
                                      className={`cursor-pointer text-[17px] font-semibold ${
                                        mode === "light"
                                          ? "rounded-lg p-1 text-green-500 hover:bg-slate-300 hover:text-green-500"
                                          : "rounded-lg p-1 text-green-300 hover:bg-[#193952] hover:text-green-100"
                                      }  transition-all ease-in-out `}
                                    >
                                      <IoCheckmarkOutline />{" "}
                                      Confirm
                                    </span>
                                    {/* break */}
                                    <div className="my-1 mt-1  h-[1px] w-full bg-gray-600"></div>
                                    <span
                                      onClick={() =>
                                        setShowConfirmationComments(
                                          !showConfirmationComments
                                        )
                                      }
                                      className={`cursor-pointer text-[17px] font-semibold ${
                                        mode === "light"
                                          ? "rounded-lg p-1 text-red-500 hover:bg-slate-300 hover:text-red-500"
                                          : "rounded-lg p-1 text-red-300 hover:bg-[#193952] hover:text-red-100"
                                      }  transition-all ease-in-out `}
                                    >
                                      <IoCloseOutline />{" "}
                                      Cancel
                                    </span>
                                    <div className="my-1 mt-1  h-[1px] w-full bg-gray-600"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="flex h-[100%] w-[100%]  py-2 text-[1rem]">
                        <div className="flex h-full w-full items-center">
                          <span className="break-all text-[1rem]">
                            {comment?.comment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* break */}
                  <div
                    className={`my-1 mt-1  h-[1px] w-full ${
                      mode === "light" ? "bg-slate-300" : "bg-gray-600"
                    }`}
                  ></div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;

// HEX CODES:
// #051925
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
