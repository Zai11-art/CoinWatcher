import React, { useId } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../state";
import Loader from "../../../components/loader";

// interface CoinMarketListData {
//     localization: {en : string};
//     tickers: {
//       market: {name: string};
//       trade_url: string;
//       base: string;
//       target: string;
//       converted_last: {usd : string};
//       trust_score: string
//     }[]
// }

// interface CoinMarketListType {
//   localization: {en : string};
//   tickers: {
//     market: {name: string};
//     trade_url: string;
//     base: string;
//     target: string;
//     converted_last: {usd : string};
//     trust_score: string
//   }[]
// }

// interface DataType {
//   market_data: {
//     current_price : {usd : number, php: number, inr: number};
//     price_change_24h_in_currency: { usd : number};
//     high_24h: {usd: number};
//     low_24h: {usd : number};
//     ath: {usd : number};
//     atl: {usd: number};
//     total_volume: {usd: number}
//   }
//   genesis_date : string;
//   localization: {en: string};
//   description: {en: string};
//   symbol: string;
//   tickers: {last: number}[];

// }

// interface ViewCardLower {
//   data: DataType;
//   hourly: {prices: [number, number][], market_caps: [number, number][],  total_volumes: [number, number][] }
//   monthly: {prices: [number, number][], market_caps: [number, number][],  total_volumes: [number, number][] }
//   max: {prices: [number, number][], market_caps: [number, number][],  total_volumes: [number, number][] }
// }

interface CoinMarketListType {
  data: {
    localization: { en: string };
    tickers: {
      market: { name: string };
      trade_url: string;
      base: string;
      target: string;
      converted_last: { usd: string };
      trust_score: string;
    }[];
  };
}

const CoinMarketList: React.FC<CoinMarketListType> = ({ data }) => {
  const mode = useSelector((state: RootState) => state.mode);
  const receivedData = [...data.tickers];
  const id = useId();

  console.log("received data here");
  console.log(receivedData);

  return (
    <div
      className="
    h-[400px] w-[100%]
    md:h-[400px] md:w-[640px]
    lg:h-[380px] lg:w-[100%]
    xl:h-[420px] xl:w-[100%]"
    >
      <h1
        className={`text-center text-2xl font-bold md:text-center md:text-3xl lg:text-left lg:text-xl xl:text-left xl:text-3xl ${
          mode === "light" ? "text-blue-900" : "text-[white]"
        }  mb-8`}
      >
        Top {data.localization.en} Markets
      </h1>
      <div
        className={`
        ${
          mode === "light"
            ? "bg-slate-200/90 font-semibold text-slate-900"
            : "chart text-white"
        }
        flex h-[30px]
        w-[100%] flex-row
        items-center justify-around
        rounded-none border-[0.5px]
        border-[#9ccddc] text-[12px] md:h-[40px]
        md:w-[640px] md:text-[15px] lg:h-[40px] lg:w-[640px]
        xl:h-[40px] xl:w-[775px]
        `}
      >
        <div className="ml-2 w-[75px] text-center text-[12px]  md:ml-6 md:text-[15px]">
          #
        </div>
        <div className="mx-2 w-[175px] text-center text-[11px] md:text-[15px] lg:mx-1">
          Market
        </div>
        <div className="mx-2 w-[175px] text-center text-[12px] md:text-[15px] lg:mx-1">
          Pair
        </div>
        <div className="mx-2 w-[250px] text-center text-[12px] md:text-[15px] lg:mx-1">
          Price
        </div>
        <div className="mx-2 w-[200px] text-center text-[12px] md:text-[15px] lg:mx-1">
          Trust Score
        </div>
      </div>
      {receivedData?.length ? (
        receivedData?.slice(0, 10).map((data, index) => (
          <div
            key={`${id}-${data.market.name}-${index}`}
            className={` 
                ${
                  mode === "light"
                    ? "bg-slate-200/70 font-semibold text-slate-900 border-[1px] border-blue-300"
                    : "chart"
                }
                z-[1] flex
                h-[30px] w-[100%]
                flex-row items-center
                rounded-sm md:h-[30px]
                md:w-[640px] 
               lg:h-[30px]
                lg:w-[640px] xl:h-[30px] xl:w-[775px] 
                `}
          >
            <div className="ml-2 w-[75px]  text-center text-[12px] md:ml-6 md:text-[15px]">
              {receivedData.indexOf(data) + 1}
            </div>
            <div className="mx-2 w-[175px]  text-center text-[14px] md:text-[15px] lg:mx-1">
              <a href={data.trade_url}>{data.market.name}</a>
            </div>
            <div className="mx-2 w-[175px]  text-center text-[66%] md:text-[15px] lg:mx-1">
              {data.base.length > 4 ? data.base.slice(0, 5) + "..." : data.base}{" "}
              /
              {data.target.length > 4
                ? data.target.slice(0, 5) + "..."
                : data.target}
            </div>
            <div className="mx-2 w-[250px]  text-center text-[14px] md:text-[15px] lg:mx-1">
              $ {data.converted_last.usd.toLocaleString()}
            </div>
            <div className="mx-2 flex  w-[200px] items-center justify-center text-center text-[14px] md:text-[15px] lg:mx-1">
              {data.trust_score == "green" ? (
                <div className="h-[10px] w-[10px] rounded-full bg-[green]"></div>
              ) : (
                <div className="h-[10px] w-[10px] rounded-full bg-[orange]"></div>
              )}
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CoinMarketList;
