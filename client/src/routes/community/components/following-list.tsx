import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../../state";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";

import { RootState } from "../../../state";
import { User } from "../../../state";

interface FollowingDataType {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

const Following = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
}: FollowingDataType) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const userState = useSelector((state: RootState) => state.user);
  const _id = userState?._id;
  const token = useSelector((state: RootState) => state.token);
  const friendsState = useSelector((state: RootState) => state.user);
  const friends = friendsState?.friends ?? [];
  const mode = useSelector((state: RootState) => state.mode);

  const isFriend = friends.find((friend) => friend?._id === friendId);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response?.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-dep

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data: User[] = await response.json(); // Assuming `data` is an array of User objects

    if (friendsState) {
      dispatch(setFriends({ user: friendsState, friends: data }));
    } else {
      console.error("User not found");
    }
  };

  return (
    <div
      className={`my-2  flex w-[100%] flex-row items-center justify-between ${
        mode === "light" ? "texct-slate-900" : "text-white"
      }`}
    >
      <div className="flex items-center">
        <img
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          src={`${userPicturePath}`}
          alt="user"
          className="h-14 w-14 cursor-pointer rounded-full"
        />
        <div className="flex flex-col">
          <span
            className="ml-4 cursor-pointer font-bold "
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            {name}
          </span>
          <span className="ml-4 text-sm italic">{subtitle}</span>
        </div>
      </div>

      {friendId !== _id && (
        <div
          className="cursor-pointer transition-all ease-in-out hover:scale-[1.02]"
          onClick={() => {
            patchFriend();

            isFriend
              ? toast.success(`You unfollowed ${name}.`, {
                  theme: `${mode === "light" ? "light" : "colored"}`,
                })
              : toast.success(`You followed ${name}.`, {
                  theme: `${mode === "light" ? "light" : "colored"}`,
                });
          }}
        >
          {isFriend ? (
            <div
              className={`rounded-full ${
                mode === "light"
                  ? "bg-slate-100 text-blue-500/90 shadow-lg hover:text-blue-300"
                  : "bg-[#0f405e] text-blue-200 hover:text-blue-400"
              }  px-2 py-1 text-2xl  `}
            >
              <IoPersonRemove />
            </div>
          ) : (
            <div
              className={`rounded-full ${
                mode === "light"
                  ? "bg-slate-100 text-blue-500/90 shadow-lg hover:text-blue-300"
                  : "bg-[#0f405e] text-blue-200 hover:text-blue-400"
              }  px-2 py-1 text-2xl  `}
            >
              <IoPersonAdd />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Following;
