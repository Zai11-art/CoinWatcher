import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { setFollowers } from "../../../state";
import { getUser } from "../../../api/get-user";
import { RootState, User } from "../../../state";
import FriendView from "../../community/components/friends-list";

interface UserType {
  userName: string;
}

interface FollowerType {
  _id: string;
  userName: string;
  bio: string;
  picturePath: string;
}

const ProfileFollowers = () => {
  // const [user, setUser] = useState<UserType | null>(null);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token);
  const loggedUser = useSelector((state: RootState) => state.user);
  const followers: FollowerType[] | undefined = loggedUser?.followers || [];
  const mode = useSelector((state: RootState) => state.mode);

  const { data: user } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUser(userId, token),
  });

  const getFollowers = async () => {
    const res = await axios.get(
      `http://localhost:3001/users/${userId}/followers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data: User[] = await res.data;

    if (loggedUser) {
      dispatch(setFollowers({ user: loggedUser, followers: data }));
    } else {
      console.error("No followers");
    }
  };

  // const getUser = async () => {
  //   const response = await fetch(`http://localhost:3001/users/${userId}`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });

  //   const data = await response?.json();
  //   // console.log(data)
  //   setUser(data);
  // };

  useEffect(() => {
    getFollowers();
  }, []); // eslint-disable-line react-hooks/exhaustive-dep

  console.log(user);

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
          followers?.length === 0 ? "h-[600px]" : "h-full"
        } shadow-xl`}
      >
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
          className={`flex w-full h-full flex-col items-center rounded-b-xl ${
            mode === "light" ? "bg-slate-200" : "bg-[#0c101a]"
          } pt-4`}
        >
          {followers?.length ? (
            followers?.map((follower) => (
              <>
                <div className="flex w-full px-12">
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
            <h1
              className={`font-lg rounded-lg ${
                mode === "light"
                  ? "bg-slate-300 shadow-lg"
                  : "bg-slate-900 text-white"
              }  p-3 px-5 font-bold mt-12`}
            >
              No Followers Yet.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFollowers;
