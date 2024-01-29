import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../../../state";
import WatchListWidget from "./WatchListWidget";
import Loader from "../../../components/Loader";

const UserWidget = ({
  userId,
  picturePath,
}: {
  userId: string | undefined;
  picturePath: string;
}) => {
  interface Coin {
    id: string;
  }
  interface CoinWatch {
    coinId: string;
  }
  interface WatchList {
    coinWatchList: CoinWatch[];
  }

  const [watchList, setWatchList] = useState<WatchList>({ coinWatchList: [] });
  const [user, setUser] = useState(null);
  const isAuth = Boolean(useSelector((state: RootState) => state.token));
  const loggedInUserIdState = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token);
  const mode = useSelector((state: RootState) => state.mode);
  const loggedInUserId = loggedInUserIdState?._id;

  const { data: coinList } = useQuery(["coinListData"], () => {
    return axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&locale=en"
      )
      .then((res) => res.data);
  });

  const getUser = async () => {
    const response = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;
    setUser(data);
  };

  const getWatchList = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedWatchList = await response.json();
    setWatchList(fetchedWatchList);
  };

  const filteredCoins: any[] = coinList?.filter((coin: Coin) => {
    return watchList?.coinWatchList?.some(
      (coinId: CoinWatch) => coinId?.coinId === coin?.id
    );
  });

  const addToWatchList = async (coin: object) => {
    const data = coin;
    const response = await fetch(
      `http://localhost:3001/users/${loggedInUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const watchListData = await response.json();

    getWatchList();
  };

  const removetoWatchList = async (coin: object) => {
    const data = coin;
    const response = await fetch(
      `http://localhost:3001/users/${loggedInUserId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const watchListData = await response.json();

    getWatchList();
  };

  useEffect(() => {
    getWatchList();
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return (
      <aside
        className={`
        mb-5 h-[100%]
        w-[95%] rounded-lg
        ${
          mode === "light" ? "bg-slate-300" : "bg-[#062c43] text-white"
        }   shadow-xx
         p-6
        md:h-[100%] md:w-[90%]
        lg:ml-8 lg:h-[100%]
        lg:w-[50%] xl:ml-12 xl:h-[100%]
         xl:w-[45%]`}
      >
        <Loader />
      </aside>
    );
  }

  const {
    userName,
    bio,
    friends,
    followers,
  }: { friends: any[]; userName: string; followers: any[]; bio: string } = user;

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex flex-col ">
        <div className="h-24 w-full rounded-t-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"></div>

        <aside
          className={`h-[100%] w-[100%] rounded-b-lg ${
            mode === "light"
              ? "bg-slate-200 text-blue-900"
              : "bg-[#062c43] text-white"
          } px-6 pb-6 pt-4 shadow-xl md:w-[100%] lg:w-[100%] xl:w-[100%]`}
        >
          <div className="flex justify-between ">
            <div className="flex items-center">
              <Link to={`/profile/${userId}`}>
                <img
                  src={`${picturePath}`}
                  alt="user"
                  className="h-14 w-14 rounded-full"
                />
              </Link>
              <div className="flex flex-col">
                <span className="ml-4 text-2xl">{`${userName}`}</span>
                <span className="ml-4 text-sm italic">{bio}</span>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </div>

          {/* break */}
          <div
            className={`my-6 h-[0.1px] w-full ${
              mode === "light" ? "bg-slate-400" : "bg-blue-300"
            } `}
          />

          <div
            className={` flex flex-row items-center 
        justify-around rounded-full ${
          mode === "light"
            ? "newscard-filter-light text-blue-900 "
            : "follower-card-gradient bg-[#062c43] text-white"
        }  p-1 py-2`}
          >
            <div className="flex flex-col items-center justify-center ">
              <span className="mb-1 text-sm font-semibold ">Bio</span>
              <span className="mb-1 font-semibold ">{bio}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link
                to={`/profile/${userId}/followings`}
                className="mb-1 flex text-sm font-semibold  transition-all  ease-in-out hover:text-blue-200 hover:underline"
              >
                Following
              </Link>
              <span className="mb-1 font-semibold ">{friends?.length}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link
                to={`/profile/${userId}/followers`}
                className="mb-1 flex text-sm font-semibold  transition-all  ease-in-out hover:text-blue-200 hover:underline"
              >
                Followers
              </Link>
              <span className="mb-1 font-semibold ">{followers?.length}</span>
            </div>
          </div>

          {/* break */}
        </aside>
      </div>

      <WatchListWidget
        filteredCoins={filteredCoins}
        watchList={watchList}
        userId={userId}
        addToWatchList={addToWatchList}
        removetoWatchList={removetoWatchList}
      />
    </div>
  );
};

export default UserWidget;
