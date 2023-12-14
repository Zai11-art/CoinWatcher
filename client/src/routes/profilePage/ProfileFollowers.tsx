import React from "react";
import FriendView from "../communityPage/communitywidgets/FollowingProfileView";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFollowers } from "../../state";
import { RootState,User } from "../../state";
import {  IoArrowBack, IoArrowForward } from "react-icons/io5";


interface UserType {
  userName: string
}


interface FollowerType {
  _id: string
  userName: string
  bio: string
  picturePath: string
}

const ProfileFollowers = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state : RootState) => state.token);
  const followerState = useSelector((state : RootState) => state.user);
  const followers : FollowerType[] | undefined = followerState?.followers;
  const mode = useSelector((state : RootState) => state.mode);

  const getFollowers = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/followers`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data : User[] = await response.json();
    
    if (followerState) {
      dispatch(setFollowers({ user: followerState, followers: data }));
    } else {
      console.error("No followers")
    }
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response?.json();
    // console.log(data)
    setUser(data);
  };

  useEffect(() => {
    getFollowers();
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-dep

  return (
    <div
      className={`flex  ${
    followers?.length ? followers.length > 5 ? "h-[100%]" : "h-screen" : ""
  } w-[100%] flex-col items-center  ${
    mode === "light"
      ? "text-glow bg-slate-300 text-blue-900"
      : "bg-[#062c43] text-white"
  }  px-3 pt-14  `}
    >
      <div className="w-[98%] sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] shadow-xl">
        <div
          className={`mt-3 flex h-[70px] w-[100%] items-center justify-between rounded-t-xl  ${
            mode === "light"
              ? "newscard-filter-light shadow-3xl bg-red-800"
              : "bg-[#051731]"
          }   px-10`}
        >
          <Link
            to={`/profile/${userId}`}
            className="flex cursor-pointer items-center justify-center text-xl  hover:scale-[1.1] hover:text-blue-300"
          >
            <IoArrowBack />
          </Link>

          <div className="text-xl font-bold ">{user?.userName}s' Followers</div>

          <div className="invisible flex cursor-pointer items-center justify-center text-xl  hover:scale-[1.1] hover:text-blue-300">
            <IoArrowForward />
          </div>
        </div>
        <div
          className={`flex ${
            followers?.length ? followers?.length > 5 ? "h-[100%]" : "h-[400px]" : ""
          } w-[100%] flex-col items-center rounded-b-xl ${
            mode === "light" ? "bg-slate-200" : "bg-[#0c101a]"
          } pt-4`}
        >
          {followers?.length ? (
            followers?.map((follower) => (
              <>
                <div className="flex w-[100%] px-12">
                  <FriendView
                    key={follower._id}
                    friendId={follower._id}
                    name={`${follower.userName}`}
                    subtitle={follower.bio}
                    userPicturePath={follower.picturePath}
                  />
                </div>

                <div className="h-[0.1px] w-[80%] bg-blue-300/30" />
              </>
            ))
          ) : (
            <h1 className={`font-lg rounded-lg ${mode === 'light' ? "bg-slate-300 shadow-lg" : "bg-slate-900 text-white"}  p-3 px-5 font-bold `}>
              No Followers Yet.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFollowers;
