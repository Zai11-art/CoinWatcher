import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Friend from "./following-list";
import { RootState, User, setFriends } from "../../../state";

const FriendListWidget = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token);
  const user = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);
  const friends = user?.friends || [];

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getFriends = async () => {
    const response = await axios.get(
      `http://localhost:3001/users/${userId}/friends`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response);
    const data: User[] = await response.data; // Assuming `data` is an array of User objects
    console.log(data);

    if (user) {
      dispatch(setFriends({ user: user, friends: data }));
    } else {
      console.error("User not found");
    }
  };

  return (
    <div
      className={`flex h-full w-full rounded-t-lg ${
        mode === "light" ? "bg-slate-200" : "bg-[#062c43] text-white"
      }  mb-5 mt-6`}
    >
      <div
        className={`h-[45px] w-[100%] ${
          mode === "light" ? "newscard-filter-light" : "bg-[#054569]"
        }  rounded-t-lg px-6 py-3`}
      >
        <h1 className="font-bold">Following</h1>
        {friends?.map((friend) => (
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
