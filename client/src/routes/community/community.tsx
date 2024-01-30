import { useSelector } from "react-redux";

import { RootState } from "../../state";
import UserWidget from "./components/user-widget";
import MyPostWidget from "./components/user-post-widget";
import AllPostsWidget from "./components/feed-post";
import FriendListWidget from "./components/friend-list-widget";
import TrendingCoinWidget from "./components/trending-coin-widget";

const Community = () => {
  const user = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);
  const _id = user?._id ?? "";
  const picturePath = user?.picturePath ?? "";

  return (
    <div
      className={`pt-16 pb-32 gap-3 ${
        mode === "light" ? "bg-slate-300" : "bg-[#061016]"
      } w-full h-full flex md:flex-row flex-col justify-center md:px-12 px-3`}
    >
      <div className="flex h-full xl:w-[1700px] md:w-[1200px] w-full gap-10 xl:flex-row flex-col justify-center">
        <div className="xl:w-[80%] w-full h-full xl:sticky static top-[100px]">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>

        <div className="flex flex-col w-full h-full gap-3">
          <MyPostWidget picturePath={picturePath} />
          <AllPostsWidget userId={_id} isProfile={false} />
        </div>

        <div
          className={`flex flex-col h-full xl:w-[27.5%] w-full xl:sticky static top-[100px]`}
        >
          <TrendingCoinWidget />
          <FriendListWidget userId={_id} />
        </div>
      </div>
    </div>
  );
};

export default Community;

// HEX CODES:
// #051925
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
