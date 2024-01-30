import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useId } from "react";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";
import { RootState } from "../../../state";
import {
  IoChevronForwardOutline,
  IoEyeOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import { addToWatchList, removetoWatchList } from "../../../api/patch-add";

interface WatchListWidgetType {
  filteredCoins: {
    id: string;
    name: string;
    market_cap_rank: string;
    image: string;
    symbol: string;
    current_price: number;
    sparkline_in_7d: { price: number[] };
  }[];
  watchList: { coinWatchList: any[] };
  userId: string | undefined | null;
  refetcher: () => void;
  // addToWatchList: (
  //   coin: object | null | undefined,
  //   userId: string | null | undefined,
  //   token: string | null | undefined
  // ) => void;
  // removetoWatchList: (
  //   coin: object | null | undefined,
  //   userId: string | null | undefined,
  //   token: string | null | undefined
  // ) => void;
}

const WatchListWidget = ({
  filteredCoins,
  watchList,
  userId, // addToWatchList,
  refetcher, // removetoWatchList,
}: WatchListWidgetType) => {
  const keyId = useId();
  const [showConfirmationList, setShowConfirmationList] = useState(false);
  const mode = useSelector((state: RootState) => state.mode);
  const token = useSelector((state: RootState) => state.token);

  return (
    <div
      className={`items-around mb-6 flex w-full flex-col rounded-lg shadow-xl ${
        mode === "light"
          ? "text-glow bg-slate-200 text-blue-900"
          : "bg-[#062c43] text-white"
      }  pb-4`}
    >
      <div className="my-3 flex justify-center">
        <span className="text-2xl">
          <IoEyeOutline />
        </span>
        <h1 className="ml-2 text-xl font-bold">My WatchList</h1>
      </div>
      <div
        className={`flex h-full w-full flex-col items-center ${
          mode === "light"
            ? "bg-slate-300/60 text-slate-900"
            : "bg-[#041120] text-white"
        }  py-4 md:flex-col lg:flex-col xl:flex-col`}
      >
        {filteredCoins?.length > 0 ? (
          <>
            {filteredCoins?.slice(0, 5).map((data, index) => (
              <div
                key={`${keyId}-${index}`}
                className={`mx-2 my-2 flex h-[100%] w-[90%] items-center justify-around rounded-lg ${
                  mode === "light"
                    ? "viewcard-filter-light"
                    : "bg-[#072233] shadow-blue-300/40"
                }  p-2 shadow-md  md:w-[90%] lg:w-[95%] xl:w-[95%]`}
              >
                {watchList?.coinWatchList?.some(
                  (coin) => coin.coinId === data.id
                ) ? (
                  <>
                    <div className="group relative">
                      <button
                        data-popover-target="popover-default"
                        onClick={() => {
                          removetoWatchList(data.id, userId, token);
                          toast.success(
                            `${data.name} Coin Removed From Watchlist.`,
                            {
                              theme: `${
                                mode === "light" ? "light" : "colored"
                              }`,
                            }
                          );
                          setShowConfirmationList(!showConfirmationList);
                          setTimeout(() => {
                            refetcher();
                          }, 200);
                        }}
                        className="mr-3 border-r-[1px] pr-1 text-[1.1rem] text-yellow-200 hover:text-red-400"
                      >
                        <IoStar />
                      </button>
                      <div
                        className={`absolute z-[100] hidden w-[150px] rounded-lg ${
                          mode === "light"
                            ? "text-glow bg-slate-100 text-blue-900 shadow-xl"
                            : "bg-[#06132b] text-red-200 shadow-red-800/80"
                        }  p-3 shadow-md  group-hover:block`}
                      >
                        <p className="font-bold ">Press to remove.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      addToWatchList(data, userId, token);
                      toast.success(`${data.name} Coin Added To Watchlist. `, {
                        theme: `${mode === "light" ? "light" : "colored"}`,
                      });
                      setTimeout(() => {
                        refetcher();
                      }, 200);
                    }}
                    className="mr-3 border-r-[1px] border-r-slate-500 pr-1 text-[1.1rem] hover:text-blue-400"
                  >
                    <IoStarOutline />
                  </button>
                )}
                <span className="w-[15%] font-bold md:text-[0.94rem] lg:text-[0.75rem] xl:text-sm ">
                  # {data.market_cap_rank}
                </span>
                <div className="w-[10%]">
                  <img
                    className="h-5 w-5 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
                    src={data.image}
                    alt="coin_image"
                  />
                </div>
                <span className="w-[20%] text-sm font-bold md:text-[0.94rem] lg:text-[0.75rem] xl:text-sm ">
                  {data?.symbol?.toUpperCase()}
                </span>
                <span className="overflow-invisible mx-2 w-[20%] text-sm font-semibold md:text-[0.94rem] lg:text-[0.75rem] ">
                  ${data?.current_price?.toLocaleString()}
                </span>
                <div className="w-[100px] rounded-md bg-[#081529] py-1 md:w-[110px] lg:w-[70px] xl:w-[90px]">
                  <Sparklines data={data.sparkline_in_7d.price}>
                    {data.current_price > data.sparkline_in_7d.price[0] ? (
                      <SparklinesLine
                        style={{
                          stroke: "#4dff58",
                          fill: "#4dff58",
                          fillOpacity: "0.2",
                        }}
                      />
                    ) : (
                      <SparklinesLine
                        style={{
                          stroke: "#fc3a3a",
                          fill: "#fc3a3a",
                          fillOpacity: "0.2",
                        }}
                      />
                    )}
                  </Sparklines>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div
            className={`flex h-[200px] w-full flex-col items-center justify-center ${
              mode === "light"
                ? "text-glow bg-slate-200 text-blue-900"
                : "bg-[#050c14]"
            }`}
          >
            <span className="bg-slate-699 p-2 text-xl font-bold">
              No coins yet
            </span>
            <Link to="/Cryptocurrencies">
              <button
                className={`py-1duration-200 mb-2 mt-6 flex justify-center rounded-lg px-3 font-bold
                      ease-in-out hover:underline
                      md:text-[15px] lg:text-[13px] xl:text-[13px] ${
                        mode === "light"
                          ? ""
                          : "text-blue-200 hover:text-blue-600 "
                      }`}
              >
                View all crypto here
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-3 flex w-[100%] items-center justify-center">
        {/* click */}
        <Link
          to={`/profile/${userId}/watchlist`}
          className="m-2 flex items-center justify-center rounded-lg bg-blue-500 p-1 px-2 transition-all ease-in-out hover:bg-blue-300 hover:text-blue-900"
        >
          <div className="flex text-[0.8rem] font-bold text-slate-200">
            view this watchlist
          </div>
          <span className="flex text-xl text-white">
            <IoChevronForwardOutline />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default WatchListWidget;
