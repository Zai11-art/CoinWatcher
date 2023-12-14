import React from "react";
import Friend from "./Following";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, User,setFriends } from "../../../state";


const FriendListWidget = ({ userId }: {userId: string}) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token);
  const friendsState = useSelector((state: RootState) => state.user);
  const friends = friendsState?.friends ?? [];
  const mode = useSelector((state: RootState) => state.mode);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data: User[] = await response.json(); // Assuming `data` is an array of User objects
  
    if (friendsState) {
      dispatch(setFriends({ user: friendsState, friends: data }));
    } else {
      console.error("User not found");
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`h-[100%] w-[100%] rounded-t-lg ${
        mode === "light" ? "bg-slate-200" : "bg-[#062c43] text-white"
      }  mb-5 mt-6`}
    >
      <div
        className={`h-[45px] w-[100%] ${
          mode === "light" ? "newscard-filter-light" : "bg-[#054569]"
        }  rounded-t-lg px-6 py-3`}
      >
        <h1 className="font-bold">Following</h1>
      </div>
      <div className="mt-2 flex w-[100%] flex-col rounded-b-lg p-2 px-6 ">
        {friends.map((friend) => (
          <>
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.userName}`}
              subtitle={friend.bio}
              userPicturePath={friend.picturePath}
            />
            {/* break */}
            <div className="my-4 h-[0.1px] w-full bg-blue-300" />
          </>
        ))}
      </div>
    </div>
  );
};

export default FriendListWidget;
