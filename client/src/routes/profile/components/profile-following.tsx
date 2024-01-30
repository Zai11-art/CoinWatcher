import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { setFriends } from "../../../state";
import { RootState, User } from "../../../state";
import Friend from "../../community/components/following-list";

const ProfileFollowings = () => {
  interface UserType {
    userName: string;
  }

  interface FriendsType {
    _id: string;
    userName: string;
    bio: string;
    picturePath: string;
  }

  const [user, setUser] = useState<UserType | null>(null);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token);
  const friendState = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);
  const friends: FriendsType[] | undefined = friendState?.friends;

  // console.log(friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data: User[] = await response.json(); // Assuming `data` is an array of User objects

    if (friendState) {
      dispatch(setFriends({ user: friendState, friends: data }));
    } else {
      console.error("User not found");
    }
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getFriends();
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`flex w-full h-[900px] overflow-y-scroll flex-col items-center px-3 pt-14 pb-32 shadow-2xl
      ${
        mode === "light"
          ? "text-glow bg-slate-300 text-blue-900"
          : "bg-[#02070f] text-white"
      }`}
    >
      <div
        className={`md:w-[600px] w-full ${
          friends?.length === 0 ? "h-[600px]" : "h-full"
        } shadow-xl`}
      >
        <div
          className={`mt-3 flex h-[70px] w-[100%] items-center justify-between rounded-t-xl ${
            mode === "light"
              ? "newscard-filter-light shadow-3xl"
              : "bg-[#051731]"
          } px-10`}
        >
          <Link
            to={`/profile/${userId}`}
            className="flex cursor-pointer items-center justify-center text-xl  hover:scale-[1.1] hover:text-blue-300"
          >
            <IoArrowBack />
          </Link>

          <div className="text-xl font-bold ">{user?.userName}s' Following</div>

          <div className="invisible flex cursor-pointer items-center justify-center  text-xl hover:scale-[1.1] hover:text-blue-300">
            <IoArrowForward />
          </div>
        </div>
        <div
          className={`flex h-full w-full flex-col items-center rounded-b-xl ${
            mode === "light" ? "bg-slate-200" : "bg-[#0c101a]"
          } pt-4 `}
        >
          {friends?.length ? (
            friends?.map((friend) => (
              <>
                <div className="flex w-[100%] px-12">
                  <Friend
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.userName}`}
                    subtitle={friend.bio}
                    userPicturePath={friend.picturePath}
                  />
                </div>
                {/* break */}
                <div className="h-[0.1px] w-[80%] bg-blue-300/30" />
              </>
            ))
          ) : (
            <h1
              className={`font-lg rounded-lg ${
                mode === "light"
                  ? "bg-slate-300 shadow-lg"
                  : "bg-slate-900 text-white"
              } p-3 px-5 font-bold mt-12`}
            >
              Not Following Anyone.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFollowings;

// {friends?.map((friend) => (
//   <>
//     <Friend
//       key={friend._id}
//       friendId={friend._id}
//       name={`${friend.userName}`}
//       subtitle={friend.bio}
//       userPicturePath={friend.picturePath}
//     />
//     {/* break */}
//     <div className="bg-blue-300 w-full h-[0.1px] my-4" />
//   </>
// ))}
