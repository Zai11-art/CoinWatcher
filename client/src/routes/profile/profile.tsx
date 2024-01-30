import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { RootState } from "../../state";
import Loader from "../../components/Loader";
import { getUser } from "../../api/get-user";
import FeedPost from "../community/components/feed-post";
import UserWidget from "../community/components/user-widget";
import FriendListWidget from "../community/components/friend-list-widget";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = useSelector((state: RootState) => state.token);
  const mode = useSelector((state: RootState) => state.mode);

  const { data: user } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUser(userId, token),
  });

  if (!user) {
    return (
      <div
        className={`lex h-[100vh] w-screen  flex-col items-center ${
          mode === "light" ? "bg-slate-300" : "bg-[#061016]"
        }  px-12 pb-24 pt-12 md:flex-col md:items-center  md:px-32 lg:flex-row  lg:items-start lg:px-[10%] xl:flex-row xl:px-[15%]`}
      >
        <Loader />;
      </div>
    );
  }

  return (
    <div
      className={`pt-16 pb-32 gap-3 ${
        mode === "light" ? "bg-slate-300" : "bg-[#061016]"
      } w-full h-full flex md:flex-row flex-col justify-center`}
    >
      <div className="flex h-full xl:w-[1400px] md:w-[1200px] w-full gap-10 lg:flex-row flex-col lg:px-12 px-4">
        <div className="w-full h-full flex flex-col">
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <FriendListWidget userId={userId || ""} />
        </div>
        <div className="w-full h-full flex">
          <FeedPost userId={userId} isProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
