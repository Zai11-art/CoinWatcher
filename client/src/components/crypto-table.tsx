//(decalration above used for sparklines as no alternatives are available at the moment)
import {
  IoStar,
  IoStarOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";

import Loader from "./loader";
import { RootState } from "../state";
import { getWatchList } from "../api/get-user";
import { addToWatchList, removetoWatchList } from "../api/patch-add";
import { getCoinData } from "../state/utils/utils";

interface CoinData {
  length: number;
  name: string;
  market_cap_rank: number;
  image: string;
  id: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
}

const CryptoTable = ({
  data,
  firstPostIndex,
  lastPostIndex,
}: {
  data: CoinData[];
  firstPostIndex: number;
  lastPostIndex: number;
}) => {
  const keyId = useId();
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.mode);
  const token = useSelector((state: RootState) => state.token);
  const isAuth = Boolean(useSelector((state: RootState) => state.token));
  const loggedInUserIdState = useSelector((state: RootState) => state?.user);
  const loggedInUserId = loggedInUserIdState?._id;

  // const [watchList, setwatchList] = useState<{
  //   coinWatchList: { coinId: string; coinName: string }[];
  // }>({ coinWatchList: [] });
  const [redirectLogin, setredirectLogin] = useState<boolean>(false);

  useEffect(() => {
    // getWatchList();
    const tableContainer = document.getElementById("table-container");
    const stickyColumns = document.querySelectorAll(".sticky-column");

    if (tableContainer && stickyColumns.length > 0) {
      tableContainer.addEventListener("scroll", () => {
        stickyColumns.forEach((column) => {
          (
            column as HTMLElement
          ).style.transform = `translateX(${tableContainer.scrollLeft}px)`;
        });
      });
    }
  }, []);

  const { data: watchList, refetch } = useQuery({
    queryKey: ["watchListData"],
    queryFn: () => getWatchList(loggedInUserId, token),
  });

  // const { refetch: refetchCoinData } = useQuery({
  //   queryKey: ["coinData"],
  //   refetchOnMount: true,
  // });

  console.log("watchlist here");
  console.log(watchList);
  console.log(data);

  return (
    <div
      className={`flex w-full flex-row ${
        mode === "light" ? "shadow-slate-900/30" : "shadow-blue-200/20"
      } shadow-2xl `}
    >
      <div className="flex h-full flex-col lg:w-[30%] sm:w-[35%] w-[60%]  ">
        <div>
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow ">
              <table className="min-w-full divide-y divide-blue-400 shadow-xl ">
                <thead
                  className={`text-glow sticky ${
                    mode === "light"
                      ? "bg-slate-200/70 text-slate-900"
                      : " bg-[#082030] text-gray-300"
                  }`}
                >
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Coin
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y divide-gray-600 ${
                    mode === "light"
                      ? "bg-slate-200/70 text-slate-900"
                      : " bg-[#082030] text-gray-300"
                  }  `}
                >
                  {/* Add rows and data */}
                  {data?.length ? (
                    data?.slice(firstPostIndex, lastPostIndex).map(
                      (
                        data: {
                          name: string;
                          market_cap_rank: number;
                          id: string;
                          image: string;
                        },
                        index: number
                      ) => (
                        <tr key={`${keyId}-${index}`}>
                          <td className="whitespace-nowrap  py-4 pl-3 pr-0 text-sm">
                            {watchList?.coinWatchList?.some(
                              (coin: { coinId: string }) =>
                                coin.coinId === data.id
                            ) ? (
                              <button
                                aria-label="remove to watchlist"
                                onClick={() => {
                                  removetoWatchList(
                                    data?.id,
                                    loggedInUserId,
                                    token
                                  );
                                  toast.success(
                                    `${data.name} Removed From Watchlist`,
                                    {
                                      theme: `${
                                        mode === "light" ? "light" : "colored"
                                      }`,
                                    }
                                  );
                                  setTimeout(() => {
                                    refetch();
                                  }, 200);
                                }}
                                className="mr-3 border-r-[1px] pr-1 text-[1.1rem] text-yellow-200 hover:text-blue-400"
                              >
                                <IoStar />
                              </button>
                            ) : (
                              // Render if the coin is not in the watchlist
                              <>
                                <button
                                  aria-label="add to watchlist"
                                  onClick={() => {
                                    addToWatchList(data, loggedInUserId, token);
                                    setredirectLogin(!redirectLogin);
                                    isAuth &&
                                      toast.success(
                                        `${data.name} Added To Watchlist.`,
                                        {
                                          theme: `${
                                            mode === "light"
                                              ? "light"
                                              : "colored"
                                          }`,
                                        }
                                      );
                                    setTimeout(() => {
                                      refetch();
                                    }, 200);
                                  }}
                                  className="mr-3 border-r-[1px] border-r-slate-500 pr-1 text-[1.1rem] hover:text-blue-400"
                                >
                                  <IoStarOutline />
                                </button>

                                {!isAuth && redirectLogin && (
                                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-60">
                                    <div className="w-[250px] border-[0.02px] border-slate-500/40 bg-[#041625] p-6 shadow-xl shadow-blue-200/10 ">
                                      {/* Pop-up content goes here */}
                                      <h2 className="mb-4 text-lg font-bold text-blue-100">
                                        Login to add coins to <br />
                                        watchlist.
                                      </h2>
                                      <div className="flex flex-col">
                                        <span
                                          onClick={() => {
                                            navigate("/login");
                                          }}
                                          className="cursor-pointer text-[17px] font-semibold text-green-300 transition-all ease-in-out hover:bg-[#193952] hover:text-green-100"
                                        >
                                          <IoCheckmarkOutline /> Go to Login.
                                        </span>
                                        <div className="my-1 mt-1  h-[1px] w-full bg-gray-600"></div>
                                        <span
                                          onClick={() =>
                                            setredirectLogin(!redirectLogin)
                                          }
                                          className="cursor-pointer text-[17px] font-semibold text-red-400 transition-all ease-in-out hover:bg-[#193952] hover:text-red-100"
                                        >
                                          <IoCloseOutline /> Cancel
                                        </span>
                                        <div className="my-1 mt-1  h-[1px] w-full bg-gray-600"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}

                            <span className="text-[0.8rem]">
                              {data.market_cap_rank}
                            </span>
                          </td>
                          <td className="flex  whitespace-nowrap px-3 py-[18.5px] text-sm">
                            <Link
                              // onClick={() => {
                              //   setTimeout(() => {
                              //     refetchCoinData();
                              //   }, 1000);
                              // }}
                              to={`/view/${data.id}`}
                            >
                              <div className="flex">
                                <div className="h-[1.2rem] w-[1.2rem] mr-1">
                                  <img
                                    alt={data.id}
                                    src={data.image}
                                    className="object-contain w-full h-full"
                                    loading="lazy"
                                  />
                                </div>
                                <span>{data.name}</span>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td>
                        <Loader></Loader>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col lg:w-[70%] sm:w-[65%] w-[40%]">
        <div className="no-scrollbar overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow">
              <table className="min-w-full divide-y divide-blue-300">
                <thead
                  className={`text-glow ${
                    mode === "light"
                      ? "bg-slate-200 text-slate-900"
                      : " bg-[#061720] text-gray-300"
                  } `}
                >
                  <tr>
                    {["Price", "1d mc", "24h", "vol", "Mcap", "7d"].map(
                      (label, index) => (
                        <th
                          key={`${label[index]}-${index}`}
                          scope="col"
                          className="w-64 px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                        >
                          {label}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody
                  className={`divide-y divide-gray-600 ${
                    mode === "light"
                      ? "bg-slate-200 text-slate-900"
                      : " bg-[#061720] text-gray-300"
                  } text-gray-300`}
                >
                  {data?.length ? (
                    data?.slice(firstPostIndex, lastPostIndex).map(
                      (
                        data: {
                          id: string;
                          current_price: number;
                          market_cap_change_percentage_24h: number;
                          price_change_percentage_24h: number;
                          total_volume: number;
                          market_cap: number;
                          sparkline_in_7d: { price: number[] };
                        },
                        index: number
                      ) => (
                        <tr
                          key={`${index}-${data.id}`}
                          className={`${
                            mode === "light"
                              ? "hover:bg-[#c1d3ee]"
                              : "hover:bg-[#0c1824]"
                          } `}
                        >
                          <td className="w-64 whitespace-nowrap px-5 py-4 text-sm">
                            ${data.current_price?.toLocaleString()}
                          </td>
                          <td
                            className={`w-64 whitespace-nowrap px-5 py-4 text-sm  ${
                              data.market_cap_change_percentage_24h > 0
                                ? `${
                                    mode === "light"
                                      ? "text-[#256d2b]"
                                      : "text-[#2ae937]"
                                  } `
                                : `${
                                    mode === "light"
                                      ? "text-[#993030]"
                                      : "text-[#ff6666]"
                                  } `
                            }`}
                          >
                            {data.market_cap_change_percentage_24h?.toFixed(2)}
                          </td>
                          <td
                            className={`w-64 whitespace-nowrap px-5 py-4 text-sm  ${
                              data.price_change_percentage_24h > 0
                                ? `${
                                    mode === "light"
                                      ? "text-[#256d2b]"
                                      : "text-[#2ae937]"
                                  } `
                                : `${
                                    mode === "light"
                                      ? "text-[#993030]"
                                      : "text-[#ff6666]"
                                  } `
                            }`}
                          >
                            {data.price_change_percentage_24h?.toFixed(2)}
                          </td>

                          <td className="w-64 whitespace-nowrap px-5 py-4 text-sm">
                            ${data.total_volume?.toLocaleString()}
                          </td>
                          <td className="w-64 whitespace-nowrap px-5 py-4 text-sm">
                            ${data.market_cap?.toLocaleString()}
                          </td>
                          <td className="w-64 whitespace-nowrap px-5 py-4 text-sm">
                            <div className="w-[100px] text-center text-[11px] md:w-[100px] md:text-[15px]  ">
                              <Sparklines data={data?.sparkline_in_7d?.price}>
                                {data.current_price >
                                data?.sparkline_in_7d?.price[0] ? (
                                  <SparklinesLine
                                    style={{
                                      stroke: `${
                                        mode === "light" ? "#28a733" : "#2ae937"
                                      } `,
                                      fill: `${
                                        mode === "light" ? "#28a733" : "#2ae937"
                                      } `,
                                      fillOpacity: "0.2",
                                    }}
                                  />
                                ) : (
                                  <SparklinesLine
                                    style={{
                                      stroke: `${
                                        mode === "light" ? "#d82e2e" : "#ff6666"
                                      } `,
                                      fill: `${
                                        mode === "light" ? "#d82e2e" : "#ff6666"
                                      } `,
                                      fillOpacity: "0.2",
                                    }}
                                  />
                                )}
                              </Sparklines>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td>
                        <Loader></Loader>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
