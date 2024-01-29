import React from "react";
import UserWidget from "./communitywidgets/userWidget";
import MyPostWidget from "./communitywidgets/MyPostWidget";
import TopCoinWidget from "./communitywidgets/TopCoinWidget";
import TrendingCoinWidget from "./communitywidgets/TrendingCoinWidget";
import { Carousel } from "flowbite-react";
import { useSelector } from "react-redux";
import AllPostsWidget from "./communitywidgets/AllPostsWidget";
import FriendListWidget from "./communitywidgets/FriendListWidget";
import { RootState } from "../../state";
import { Suspense } from "react";
import Loader from "../../components/Loader";

const Community = () => {
  const user = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);
  const _id = user?._id ?? "";
  const picturePath = user?.picturePath ?? "";

  console.log(user);

  return (
    <div
      className={`pt-16 pb-32 gap-3 ${
        mode === "light" ? "bg-slate-300" : "bg-[#061016]"
      } w-full h-full flex md:flex-row flex-col justify-center`}
    >
      <div className="flex  h-full xl:w-[1700px] md:w-[1200px] w-full gap-10">
        <div className="w-[80%] flex sticky top-[100px] left-0 h-full">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>

        <div className="flex flex-col w-full h-full gap-3">
          <MyPostWidget picturePath={picturePath} />
          <AllPostsWidget userId={_id} isProfile={false} />
        </div>

        <div className={`flex flex-col sticky top-[100px] right-0 h-full gap-3 w-[27.5%]`}>
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
