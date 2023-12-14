import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../state";

const TrendingCoinWidget = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const { data: trending } = useQuery(["coinTrending"], async () => {
    return await axios
      .get("http://localhost:3000/services/trending")
      .then((res) => res.data.coins);
  });

  const { data: btcPrice } = useQuery(["btcPrice"], () => {
    return axios
      .get("http://localhost:3001/services/btcPrice")
      .then((res) => res.data);
  });

  return (
    <div
      className={`
     flex ${
       mode === "light"
         ? "text-glow border-[1px] border-blue-300 bg-slate-200 font-semibold text-blue-900"
         : "chart text-white"
     }
    h-[100%] w-[100%] 
    flex-col items-center rounded-xl
    `}
    >
      <div className="mx-4 mb-[20px] mt-4 flex flex-col items-center xl:mb-[10px] xl:text-[1rem]">
        <h1 className="text-center text-xl font-bold ">Trending Coins</h1>
      </div>

      {trending ? (
        trending.slice(0, 5).map((data: { item: { score: number, small: string, name: string, price_btc: number }, id: string,   }) => (
          <div
            className={` 
            ${mode === "light" ? "newscard-filter-light" : "cryptocard-grad"}
            z-[1] my-2
            flex
            h-[35px] w-[90%]
            flex-row
            items-center justify-between rounded-lg
          `}
          >
            <div className="ml-2 w-[50px] text-center text-[12px] md:ml-6 md:w-[75px] md:text-[12px]">
              {data.item.score + 1}
            </div>
            <div className="flex w-[110px] flex-row items-center text-center text-[12px] md:w-[200px] md:text-[12px] ">
              <Link
                rel="noopener noreferrer"
                className="flex flex-row items-center duration-200 ease-in-out hover:scale-[1.1]"
                to={`/view/${data.id}`}
              >
                <img
                  src={data.item.small}
                  alt=""
                  className="ml-3 mr-2 h-[22.5px] w-[22.5px] md:ml-5 md:h-[20px] md:w-[20px] lg:ml-5"
                />
                <span className="overflow-hidden  text-[12px] font-bold">
                  {data.item.name}
                </span>
              </Link>
            </div>
            <div className="mx-2 w-[75px] text-center text-[12px] md:w-[175px] md:text-[12px] lg:mx-1">
              $
              {(
                (data?.item?.price_btc *parseFloat(`${btcPrice?.bitcoin?.usd ? btcPrice?.bitcoin?.usd : btcPrice}`)) /1
              ).toFixed(5)}
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
      <Link to="/Home">
        <button
          className="mb-2 mt-6 flex justify-center rounded-lg  
          bg-blue-500 px-3 py-1 text-white duration-200 ease-in-out
          hover:bg-blue-100 hover:text-blue-500 md:text-[15px] lg:text-[13px] xl:text-[13px]"
        >
          View all coins here
        </button>
      </Link>
    </div>
  );
};

export default TrendingCoinWidget;
